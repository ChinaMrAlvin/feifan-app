import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormBuilder } from '@angular/forms';




@Component({
    selector: 'addNew-app',
    templateUrl: './addnew.component.html',
    styleUrls: ['./addnew.component.css'],

})

export class AddNewComponent {
    public addDataForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    public createForm() {
        this.addDataForm = this.fb.group({
            make: this.fb.group({
                baseUdid: ["", Validators.required],
                baseMapName: "",
                basePartnerUdid: "",
                baseCity: "",
                baseDistrict: "",
                baseAddress: "",
                baseMapArea: ""
            }),
            project: this.fb.group({
                projectBuildArea: "",
                projectLinkmanName: "",
                projectLinkmanPhone: "",
                projectManagerName: "",
                projectNature: false,
                projectPrNo: false,
                projectReport: false
            }),
            product: this.fb.group({
                productUpdateFrequency: "",
                productStartDate: "",
                productDeadline: "",
                productSuspendStatus:0,
                productSuspendReason:"",
                productImportMap:0,
                productCommitDate:"",
                productBpVerify:0,
                productRegisterCommitDate:"",
                productInnerStatus:"",
                productInnerProducer:""
            })
        })

      this.addDataForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
    }

    onValueChanged(data?: any){
        //作验证逻辑
       console.log(data)
    }

    onSubmit(addDataForm){
        alert(1);
        console.log(addDataForm);
    }


}