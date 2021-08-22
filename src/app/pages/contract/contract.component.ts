import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  validateForm!: FormGroup;
  date: any;
  size: NzButtonSize = 'large';
  onChange(event: any) {

  }

  createNotification(type: string): void {
    console.log('chamou')
    this.notification.create(
      type,
      'Cadastro de contrato',
      'Contrato cadastrado com sucesso'
    );
  }

  constructor(private fb: FormBuilder, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      document: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    this.createNotification('success');
    fetch('http://localhost:3000/contract', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        name: this.validateForm.controls.name.value,
        serviceDescription: this.validateForm.controls.description.value,
        term: {
            startDate: this.validateForm.controls.date.value[0],
            endDate: this.validateForm.controls.date.value[1]
        }, provider: {"document": this.validateForm.controls.document.value,}
    }),
  })
    .then(data => {
      return data.json()
    })
    .then(response => { 
      console.log("depois da resposta")
    });
  }

  

}
