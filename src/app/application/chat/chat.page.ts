/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
import { HttpClient } from '@angular/common/http';
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
  computerNo: any;
  responseA: string = 'A';
  responseB: string = 'B';
  responseC: string = 'C';
  responseD: string = 'D';

  public memberId: any;
  qCounter: number = 0;  // chat bot question coutner
  rCounter: number = 0;  // user response counter
  mCounter: number = 1;  // chat message counter
  showQResponse: boolean = false;
  qAnswer: string = '';

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
    private router: Router,
    private http: HttpClient
  ) {
  }

  public realQuestions: any = [
    {id: 1, question: 'Hello '},
    {id: 2, question: 'click on any of the question below to get your updates'},
    {id: 3, question: 'Application Status?'},
    {id: 4, question: 'Accrued right?'},
    {id: 5, question: 'Total Contribution?'},
    {id: 6, question: 'When is my Payment Schedule?'},
    {id: 7, question: 'click here to send your message to helpdesk center'}
  ];

  public selectedQuestion(id: number) {
    // console.log('clicked no', id);
    switch(id){
      case 3:  this.newGetUserAnswers('A'); break;
      case 4:  this.newGetUserAnswers('B'); break;
      case 5:  this.newGetUserAnswers('C'); break;
      case 6:  this.newGetUserAnswers('D'); break;
      default: this.showAnswer("Please click on any question"); break;
    }
    
  }


  public showAnswer(answer: string,) {
    this.showQResponse = true;
    this.qAnswer = answer;
    setTimeout(() => {
      this.showQResponse = false;
    }, 50000);
  }
 
  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }
  

  navigateToSupport() {
    this.router.navigate(['/router/support']);
  }
 

  newGetUserAnswers(questionId: any){
    this.http.get(`http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/${this.computerNo}/${questionId}`, {headers: {'Content-type':'application/json'}}).subscribe({
      next: (data: any)=>{
        // console.log('testing the response',JSON.parse(data));
      },
      error: (data: any)=>{
        /** We are getting the answer as error or return as error so take note */
        const returnData = JSON.parse(JSON.stringify(data));
        this.showAnswer(returnData?.error?.text);
        // console.log('testing the response', returnData, returnData?.error?.text); 
      }
    })
  }

  ngOnInit(): void {
    
    this.getUserData();
    this.verifyLogin();
    // this.newGetUserAnswers('A');
    // setTimeout(() => {
    //    this.postQuestion();
    // }, 2000);

   

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

  async getUserData(){
    this.memoryData = await JSON.parse(this.memoryData);
    // console.log('from local storage chat',this.memoryData);
    const fullname = this.memoryData?.fullname.split(" ");
    this.userName = `${fullname?.[0]} ${fullname?.[1]}`;
    this.userFirstName = fullname?.[0];
    // console.log('user name', this.userFirstName);
    this.memberId = this.memoryData?.memberId;
    // console.log('member id', this.memberId);
    this.computerNo = this.memoryData?.computerNo;
    // console.log('user computer number', this.computerNo);
    // this.getUserAnswers();
    
  }

}
