import { Component, OnInit,} from '@angular/core';
import { AuthenticationService } from '../Shared/authentication.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private service : AuthenticationService,
    private firestore : AngularFirestore,
    private toastr : ToastrService
    ) { }

  ngOnInit() {
  }

  resetForm(form? : NgForm){
    if(form!= null)
    form.resetForm();
    this.service.formData = {
      FirstName : '' ,
      LastName : '' ,
      Email : '' ,
      Password : '' ,
      RePassword : '', 
      Contact : '',
      UserType : ''
    }
  }

  onSubmit(form:NgForm){
    let data=form.value ;
    console.log("print :)))");

    if (form.value.Password == form.value.RePassword){

        console.log("sucess");
        this.firestore.collection('Users').add(data);

        this.toastr.success('User Added Sucessfully', 'Jamboree.NewUser');
    }
    
    else {
      console.log("Failed");
      this.toastr.error('Passwords not matching', 'Jamboree.NewUser');
    }
    this.resetForm(form);
  }
}
