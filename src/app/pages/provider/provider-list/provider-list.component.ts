import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  constructor() { }

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(document: string): void {
    const index = this.listOfData.findIndex(item => item.document === document);
    this.editCache[document] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(document: string): void {
    const index = this.listOfData.findIndex(item => item.document === document);
    Object.assign(this.listOfData[index], this.editCache[document].data);
    this.editCache[document].edit = false;

    console.log(this.listOfData[index])

    fetch('http://localhost:3000/provider', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        "providerType": this.listOfData[index].providerType,
        "document": this.listOfData[index].document,
        "name": this.listOfData[index].name,
        "email": this.listOfData[index].email,
        "address": {
          "id": this.listOfData[index].addressId,
          "cep": this.listOfData[index].cep,
          "logradouro": this.listOfData[index].logradouro,
          "complemento": this.listOfData[index].complemento,
          "numero": this.listOfData[index].numero,
          "bairro": this.listOfData[index].bairro,
          "localidade": this.listOfData[index].localidade,
          "uf": this.listOfData[index].uf,
          "ibge": "",
          "gia": "",
          "ddd": "",
          "siafi": ""
        }
      }),
    })
      .then(data => {
        return data
      })
      .then(response => {
        console.log(response)
      });
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.document] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  remove(document: string): void {
    console.log(document)
    const index = this.listOfData.findIndex(item => item.document === document);

    console.log(this.listOfData[index])

    fetch(`http://localhost:3000/provider?document=${document}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "",
    })
      .then(data => {
        return data
      })
      .then(response => {
        console.log(response)
        this.listOfData = this.listOfData.filter(d => d.document !== document);
        this.updateEditCache();
      }).catch(err => {
        console.log(err)
      })
  }

  ngOnInit(): void {

    fetch('http://localhost:3000/provider')
      .then(data => {
        return data.json()
      })
      .then(providers => {
        console.log(providers)
        const data = [];

        for (let provider of providers) {

          const newProvider: ItemData = {
            providerType: provider.providerType,
            document: provider.document,
            name: provider.name,
            email: provider.email,
            cep: provider.address.cep,
            logradouro: provider.address.logradouro,
            numero: provider.address.numero,
            complemento: provider.address.complemento,
            bairro: provider.address.bairro,
            localidade: provider.address.localidade,
            uf: provider.address.uf,
            addressId: provider.address.id
          }

          data.push(newProvider);

          this.listOfData = data;
          this.updateEditCache();
        }
      });
  }
}

interface ItemData {
  providerType: string,
  document: string,
  name: string,
  email: string,
  cep: string,
  logradouro: string,
  numero: string
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  addressId: string,
}
