import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResidenceService } from '../residence.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css'],
})
export class AddResidenceComponent {
  addResidenceForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private residenceService: ResidenceService,private route: Router) {
    this.addResidenceForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.addResidenceForm.valid) {
      /*const newResidence = {
        ...this.addResidenceForm.value,
        image: this.imagePreview || 'assets/default-image.png',
      };
      this.residenceService.addResidence(newResidence);
      this.addResidenceForm.reset();
      this.imagePreview = null;
      alert('Residence added successfully!');*/
      const newResidence = {
        ...this.addResidenceForm.value,
        image: this.imagePreview || 'assets/default-image.png',
      };
      this.residenceService.addResidence(newResidence).subscribe(()=>this.route.navigateByUrl('/residences'));
    }
    else{
      console.log(
        'Form is invalid'
      );
    }
  }
}
