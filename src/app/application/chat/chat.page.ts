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

  // public questions: any = [
  //   {id: 1, question: 'Guess you are doing well?'},
  //   {id: 2, question: 'Would you like to know update about your application status'},
  //   {id: 3, question: 'Oops!!! No update on your status now'},
  //   {id: 4, question: 'How about your payment approval, would you like to know about it?'},
  //   {id: 5, question: 'Payment process is yet to commence. You can ask me later '},
  //   {id: 6, question: 'How about your accessment due date, would you like to know about it?'},
  //   {id: 7, question: 'Your accessment due date is 20th of Jan 2023'},
  //   {id: 8, question: 'Thanks for your time and patience. I have to leave now. Hope my response is helpful'},
  //   {id: 9, question: 'Glad to know about that. I\'m always here to help you get updates anytime'},
  //   {id: 10, question: 'Oops! I\'m sorry about that. Hope next time you find it helpful'},
  //   {id: 11, question: 'Ok no problem. Kindly click on the link below to log your complain with the admin'},
  // ];

  public realQuestions: any = [
    {id: 1, question: 'Hello '},
    {id: 2, question: 'click on any of the question below to get your updates'},
    {id: 3, question: 'Application Status?'},
    {id: 4, question: 'Accrued right?'},
    {id: 5, question: 'Total Contribution?'},
    {id: 6, question: 'When is my Payment Schedule?'},
    {id: 7, question: 'click here to send your message to helpdesk center'}
  ];

  public mainQuestions: any = {
   "applicationStatus" : "not yet available", 
   "accruedRightPaid": 0, 
   "totalContribution": 0, 
   "paymentSchedule": 'not yet approved'
  }

  public selectedQuestion(id: number) {
    console.log('clicked no', id);
    switch(id){
      case 3: this.showAnswer(this.mainQuestions.applicationStatus); this.newGetUserAnswers('A'); break;
      case 4: this.showAnswer(this.mainQuestions.accruedRightPaid); this.newGetUserAnswers('B'); break;
      case 5: this.showAnswer(this.mainQuestions.totalContribution); this.newGetUserAnswers('C'); break;
      case 6: this.showAnswer(this.mainQuestions.paymentSchedule); this.newGetUserAnswers('D'); break;
      default: this.showAnswer("Please click on any question"); break;
    }
    
  }


  public showAnswer(answer: string,) {
    console.log('i worked');
    
    this.showQResponse = true;
    this.qAnswer = answer;
    setTimeout(() => {
      this.showQResponse = false;
    }, 10000);
  }
 
  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }
  // getResponse(event) {
  //   console.log('response event', event);
  //   if (event == 1) {
  //     this.showChat(this.responses[0].response, this.messageType[1])
  //   }
  //   else  if (event == 2) {
  //     this.showChat(this.responses[1].response, this.messageType[1]);
  //   }
  //   else  if (event == 3) {
  //     this.showChat(this.responses[2].response, this.messageType[1]);
  //   }
  //   else  if (event == 4) {
  //     this.showChat(this.responses[3].response, this.messageType[1]);
  //   }

  //   this.showResponse = false;
  // }

  // public postQuestion() {
  //   if(this.qCounter < this.questions.length)
  //   {
  //     // wait half a seconds before showing the answer
  //     setTimeout(() => {
  //       this.showChat(this.questions[this.qCounter].question, this.messageType[0]);
  //        // wait 2milliseconds before showing the response
  //       this.showResponse = true;
  //     }, 2000);
  //   }
  // }

  // public showChat(newMsg, type) {
  //   const msg = {id: this.mCounter, mtype: type, message: newMsg};
  //   console.log('passed msg', msg);
  //   this.messages.push(msg);
  //   console.log('main msg', this.messages);
  //   if (type === this.messageType[0]) {
  //    this.prevMsgId = this.questions[this.qCounter].id;
  //    this.qCounter++;
  //   }
  //   else {
  //     if (newMsg === this.responses[1].response) {
  //       if(this.prevMsgId == 2 ||
  //         this.prevMsgId == 4 ||
  //         this.prevMsgId == 6  ){
  //           this.qCounter++;
  //         }
  //       else if(this.prevMsgId == 8) {
  //         this.qCounter++;
  //       }
  //       this.postQuestion();
  //     }
  //     else if(newMsg === this.responses[3].response){
  //       this.qCounter = 10;
  //       this.postQuestion();
  //       this.showResponse = false;
  //       this.showSupportLink = true;
  //     }
  //     else{
  //       this.postQuestion();
  //     }
  //   }
  // }

  navigateToSupport() {
    this.router.navigate(['/router/support']);
  }
 
  getUserAnswers(){
    // http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/100050/D

    this.http.get(`http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/ ${this.memberId}`).subscribe((data: any) => {
      console.log('member data', data);
      this.mainQuestions.applicationStatus = 'application status -' + data?.applicationStatus;
      this.mainQuestions.accruedRightPaid = data?.accruedRightPaid == 0 ? 'You currently do not have accrued right paid': data?.accruedRightPaid;
      this.mainQuestions.totalContribution = 'payment status - ' + data?.paymentSchedule;
      this.mainQuestions.certificateReady = data?.certificateReady == false ? 'Your certificate is not yet ready': data?.certificateReady ;
      console.log('user answerr', this.mainQuestions);
      
    })
  }
  newGetUserAnswers(questionId: any){
    // http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/100050/D


    // this.http.get(`10000377/A`, {headers: {'Content-Type':'application/json'}}).subscribe({
      this.http.get(`http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/10000377/B`, {  }).subscribe({
        next: data => {
          console.log('sent successfully', data);
          // sessionStorage.setItem('userData', JSON.stringify(data));
        },
        error: data => {
          console.log('something went wrong', data);

        }
      });
  }

  ngOnInit(): void {
    
    this.getUserData();
    this.verifyLogin();
    this.newGetUserAnswers('A');
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
    console.log('from local storage chat',this.memoryData);
    const fullname = this.memoryData?.fullname.split(" ");
    this.userName = `${fullname?.[0]} ${fullname?.[1]}`;
    this.userFirstName = fullname?.[0];
    console.log('user name', this.userFirstName);
    this.memberId = this.memoryData?.memberId;
    console.log('member id', this.memberId);
    this.computerNo = this.memoryData?.computerNo;
    console.log('user computer number', this.computerNo);
    
    this.getUserAnswers();
    
  }

}
