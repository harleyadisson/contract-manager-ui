import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  documentTypeDropdown: string = '';
  size: NzButtonSize = 'large';
  private cepCounter: number = 0;

  validateForm!: FormGroup;
  onChange(event: any) {

  }

  nzDropdownMenu: any;

  constructor(private fb: FormBuilder) { }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    console.log(this.validateForm.value)
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      document: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cep: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      logradouro: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      complemento: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      uf: [null, [Validators.required]],
      documentType: [null, [Validators.required]],
    });

  }

  onKey(event: any) {
    if (event.code === "Backspace") {
      if(this.cepCounter > 0)
        this.cepCounter -= 1;
    } else {
        this.cepCounter += 1;
    }
     
    if (this.cepCounter == 8) {
      console.log(this.validateForm.controls.cep.value)
      fetch(`http://localhost:3000/address?cep=${this.validateForm.controls.cep.value}`)
      .then(data => {
        return data.json()
      })
      .then(address => {
        console.log(address)
        this.validateForm.patchValue({
          logradouro: address.logradouro,
          cidade: address.localidade,
          bairro: address.bairro,
          uf: address.uf
        });
      })
    }

    console.log(this.cepCounter)

  }
}
