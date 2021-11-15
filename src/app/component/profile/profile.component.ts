import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminGuard } from 'src/app/guards/auth.guard';
import { Observable } from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { map, finalize, retry, catchError } from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage'
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  @Input() fileDetails = {url: ''};
  id = this.actRoute.snapshot.params['id'];

  userData : any = {};
  
  Skills : any = [];
  authData: any = [];
  adminBoolean: Observable<any>
  closeModal: string;

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  userProfile: any = [];
  userPicture: any = {};
  uuuid;

  constructor( 
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public authGuard: AdminGuard,
    private modalService: NgbModal,
    private storage: AngularFireStorage,) {
      this.adminBoolean = this.userService.admin; // Put this inside your constructor
     }

  ngOnInit(): void {
    this.loadSkills();
    this.loadProPic();
    this.userService.getUser(this.id).subscribe((data: {}) =>{
      this.userData = data
      console.log(this.userData.admin)
    })
    
  }

  // Get skills list
  loadSkills() {
    return this.userService.getSkills(this.id).subscribe((data: {}) => {
      this.Skills = data;
      console.log(this.Skills)
    })
  }

   // profile picture get
  loadProPic() {
    return this.userService.getProPic(this.id).subscribe((data:any) => {

      
      let picData = [];
      this.userPicture = (data[0])
      console.log("Hello",this.userPicture)
      picData.push(...data) 

      // console.log(picDat.map((pic:any)=>{

      //   console.log(pic.url)
      // }))


      // console.log(...data)
      
      // this.userPicture = JSON.stringify(data)
      // console.table(this.userPicture);
    })
  }
  // profile picture get ends

   // Delete User
   deleteUser(id: string) {
      this.userService.deleteUser(id).subscribe(data => {
        this.router.navigate(['/user-list'])
      })
  }

  // Delete skills
  deleteSkills(id: any) {
      this.userService.deleteSkill(id).subscribe(data => {
        this.loadSkills()
      })
  }  

  // modal starts
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // modal ends

  // profile picture starts with
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `UsersProfilePics/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`UsersProfilePics/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.uuuid = this.fb.getDownloadURL;
            }
            this.fileDetails.url = this.fb;

            this.userService.storeURL(this.id, this.fileDetails).subscribe((data: {}) => {
              this.userProfile = data;
            });
            console.log(
              'this is the url we have number 1' + this.fileDetails.url
            );
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }
  // profile picture ends

}
