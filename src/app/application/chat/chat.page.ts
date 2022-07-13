/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPageComponent implements OnInit, AfterContentChecked {
  @Input() logo:string = "./assets/images/coat-of-arm.png";
  public userName: string;


  public userFirstName = '';
  public questions: any = [
    {id: 1, question: 'Guess you are doing well?'},
    {id: 2, question: 'Would you like to know update about your pension status'},
    {id: 3, question: 'Oops!!! No update on your status now'},
    {id: 4, question: 'How about your payment approval, would you like to know about it?'},
    {id: 5, question: 'Payment process is yet to commence. You can ask me later '},
    {id: 6, question: 'How about your accessment due date, would you like to know about it?'},
    {id: 7, question: 'Your accessment due date is 20th of Jan 2023'},
    {id: 8, question: 'Thanks for your time and patience. I have to leave now. Hope my response is helpful'},
    {id: 9, question: 'Glad to know about that. I\'m always here to help you get updates anytime'},
    {id: 10, question: 'Oops! I\'m sorry about that. Hope next time you find it helpful'},
    {id: 11, question: 'Ok no problem. Kindly click on the link below to log your complain with the admin'},
  ];

  qCounter: number = 0;  // chat bot question coutner
  rCounter: number = 0;  // user response counter
  mCounter: number = 1;  // chat message counter

  public userResponses: any = [];
  public messages: any = [{id: 1, mtype: 'bot', message: `Hello ${this.userFirstName}`},];
  public messageType = ['bot', 'user'];
  public showResponse: boolean = false;
  public showSupportLink: boolean = false;
  public prevMsgId = 0;

  public responses = [ {id: 1, response: 'Yes'}, {id: 2, response: 'No'}, {id: 3, response: 'Okay'}, {id: 4, response: 'I have a complain'}];

  public complainResponse = `No problem, you are in the right place. However, I'm not in a possition to 
  handle your complain. Kindly click on the link below to send your complain to the right quaters. Thank you.`;

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }
  getResponse(event) {
    console.log('response event', event);
    if (event == 1) {
      this.showChat(this.responses[0].response, this.messageType[1])
    }
    else  if (event == 2) {
      this.showChat(this.responses[1].response, this.messageType[1]);
    }
    else  if (event == 3) {
      this.showChat(this.responses[2].response, this.messageType[1]);
    }
    else  if (event == 4) {
      this.showChat(this.responses[3].response, this.messageType[1]);
    }

    this.showResponse = false;
  }

  public postQuestion() {
    if(this.qCounter < this.questions.length)
    {
      // wait half a seconds before showing the answer
      setTimeout(() => {
        this.showChat(this.questions[this.qCounter].question, this.messageType[0]);
         // wait 2milliseconds before showing the response
        this.showResponse = true;
      }, 2000);
    }
  }

  public showChat(newMsg, type) {
    const msg = {id: this.mCounter, mtype: type, message: newMsg};
    console.log('passed msg', msg);
    this.messages.push(msg);
    console.log('main msg', this.messages);
    if (type === this.messageType[0]) {
     this.prevMsgId = this.questions[this.qCounter].id;
     this.qCounter++;
    }
    else {
      if (newMsg === this.responses[1].response) {
        if(this.prevMsgId == 2 ||
          this.prevMsgId == 4 ||
          this.prevMsgId == 6  ){
            this.qCounter++;
          }
        else if(this.prevMsgId == 8) {
          this.qCounter++;
        }
        this.postQuestion();
      }
      else if(newMsg === this.responses[3].response){
        this.qCounter = 10;
        this.postQuestion();
        this.showResponse = false;
        this.showSupportLink = true;
      }
      else{
        this.postQuestion();
      }
    }
  }

  navigateToSupport() {
    this.router.navigate(['/router/support']);
  }
  ngOnInit(): void {
    this.verifyLogin();
    setTimeout(() => {
       this.postQuestion();
    }, 2000);

   

  }


  
  memoryData: any = sessionStorage.getItem('userData');

  verifyLogin(){
    if (this.memoryData == undefined || this.memoryData == null ) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    } else {
      this.getUserData();
      
    }
  }

  getUserData(){
    this.memoryData = JSON.parse(this.memoryData);
    console.log('from local storage chat',this.memoryData);
    this.memoryData?.fullname; 
    this.userName = this.memoryData?.fullname.split(" ");
    this.userName = `${this.userName?.[0]} ${this.userName?.[1]}`;

  }

}
