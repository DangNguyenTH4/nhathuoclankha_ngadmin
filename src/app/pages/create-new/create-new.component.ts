import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MedicineDtoAdmin, MedicineDto, MedicineControllerService } from '../../../typescript-angular-client';
import { ToastrService } from '../sharedmodule/toast';
import { Logger } from '../../log.service';

@Component({
  selector: 'ngx-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
  providers: [MedicineControllerService,ToastrService]
})
export class CreateNewComponent implements OnInit {
  rfContact: FormGroup;
  constructor(private medicineBuilder: FormBuilder,
    private log:Logger,
    private medicineControllerService: MedicineControllerService  ,
    private toast:ToastrService) { }

  ngOnInit() {
    this.rfContact = this.medicineBuilder.group({
      code: '',
      medicineName: '',
      unit: '',
      company: this.medicineBuilder.group({
        companyName: '',
      }),
      price: this.medicineBuilder.group({
        boughtPrice: '',
        sellForCompanyPrice: '',
        sellForFarmPrice: '',
        sellForPersonalPrice: ''
      })
    });
  }
  onSubmit() {
    // Do something awesome
    let temp: MedicineDtoAdmin = {};
    this.log.logAny(temp);
    let medicine = this.rfContact.value;
    this.log.log(medicine);
    this.log.logAny(this.rfContact);
    // this.rfContact.reset();
    this.log.log(medicine);
    this.log.log("Create ...");
    this.medicineControllerService.createNewOneUsingPOST(medicine).subscribe(
      result => {
        this.log.logAny(result);
        this.toast.notify(1,"Thành công","Thêm thành công");

      },
      error=>{
        this.log.log(error);
        this.log.log("Error: "+error);
        if(error.status!==200){
          this.toast.notify(4,"Không thành công",error.error.message);
        }
        else{
          this.toast.notify(1,"Thành công","Thêm thành công");
        }
      });
  }

}
