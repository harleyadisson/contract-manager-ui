import { query } from '@angular/animations';
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

    console.log(this.validateForm.controls)

    fetch('http://localhost:3000/provider', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "providerType": this.validateForm.controls.documentType.value,
          "document": this.validateForm.controls.document.value,
          "name": this.validateForm.controls.name.value,
          "email": this.validateForm.controls.email.value,
          "address": {
            "cep": this.validateForm.controls.cep.value,
            "logradouro": this.validateForm.controls.logradouro.value,
            "complemento": this.validateForm.controls.complemento.value,
            "bairro": this.validateForm.controls.bairro.value,
            "localidade": this.validateForm.controls.localidade.value,
            "uf": this.validateForm.controls.uf.value,
            "ibge": "",
            "gia": "",
            "ddd": "",
            "siafi": ""
          }
        }),
    })
      .then(data => {
        return data.json()
      })
      .then(response => {
        console.log(response)
      });

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      document: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cep: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      logradouro: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      complemento: [null],
      bairro: [null, [Validators.required]],
      localidade: [null, [Validators.required]],
      uf: [null, [Validators.required]],
      documentType: [null, [Validators.required]],
    });

    fetch('http://localhost:3000/provider')
    .then(data => {
      return data.json()
    })
    .then(providers => {
      console.log(providers)
    })

  }

  onKey(event: any) {
    if (event.code === "Backspace") {
      if (this.cepCounter > 0)
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
            localidade: address.localidade,
            bairro: address.bairro,
            uf: address.uf
          });
        })
    }

    console.log(this.cepCounter)

  }
}
