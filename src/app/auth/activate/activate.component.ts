import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  token: string | null;

  constructor(private router: Router, private route: ActivatedRoute , private auth : AuthService) {
    this.token = null;
  }
  ngOnInit(): void {
    this.route.params.subscribe(async params => {
        this.token = await params['token']
        const record = {
           'token':this.token
        }
        await this.auth.activateAccount(record).subscribe(res =>{ 
           setTimeout(() => {
            this.router.navigateByUrl('/')  
           }, 1000);
        })
        
     });
  }
}
