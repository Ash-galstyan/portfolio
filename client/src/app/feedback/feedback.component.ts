import { Component, OnInit } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { Feedback } from '../constants/feedback';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [
    {
      name: 'Dzianis Kvashevich',
      title: 'Senior QA specialist',
      relationship: 'Colleague/ Epam Anywhere',
      message: `
        Ashot has steadily shown progress and professional growth on the project and has been always contributing to its success showing his dedication and commitment.
        He gained quite deep and detailed understanding of the complex logic system which helped him to undertake more challenging and demanding tasks and improve the overall product quality. This in its turn was also beneficial for his own development and learning as he was always eager to deal with non-trivial assignments.
        Ashot demonstrated his flexibility and agility shifting focus on changing priorities or working on multiple tasks which highlighted his good stress-resistance, problem solving and time management skills. He was always ready to take ownership and put an extra effort in order to meet or even exceed expectations from the Team/Customer.
        Ashot actively participated in all Scrum ceremonies. e.g. by clearly reporting his status and outlining impediments/dependencies at Daily Standups, providing his input and estimations at Backlog Refinement sessions, sharing his ideas and suggestions at Retrospectives, demoing implementations to the PO at Sprint Reviews, etc. He was always easy to reach and assist when required demonstrating his ability to effectively work in a team and share knowledge.
        This is what helped him to build trustful and respectful relations with the Team/Customer and prove his professionalism and reliability, as well as to boost his skills and expertise. Thus, I’m sure that Ashot is ready to make the next step in his career that will offer him new challenges, responsibilities, and opportunities.
      `
    },
    {
      name: 'Aram Arshakyan',
      title: 'Frontend developer',
      relationship: 'Colleague/ Epam Anywhere',
      message: `
        I am working with Ashot every day and I see his professional progression and developing every day.
        I look forward to work with him in the future because he is always helpful, hard worker, friendly.
        I will recommend him for a more challenging task or role because he is very professional, responsible and purposeful. He always reaches his plans and goals.
      `
    }
  ];
  innerFeedbacks: Feedback[] = [
    {
      name: 'Gevorg Melkonyan',
      title: 'Frontend developer/ Angular',
      relationship: 'Colleague/ Epam Anywhere',
      message: `
        Ashot is a great team member. I have worked with him in the same project and in the same team, he is an excellent developer who is not afraid of difficult tasks. He is very involved in the project, participating in weekly meetings with the PO, PBR, sprint planning, retro and sprint review sessions.
        He also mastered his skills by successfully completing various assignments and tasks even when initially he was unfamiliar with the functionality which required extra time and efforts
        Also, Ashot is a hard-working and responsible person. I think he has enough experience and skills to do the more challenging tasks and roles.
      `
    },
    {
      name: 'Dzmitry Skatarenka',
      title: 'BA',
      relationship: 'Colleague/ Epam Anywhere',
      message: `
        Ashot is a great team member. He has been on the project for a long time which says a lot. Although our product is very complex, he does an excellent job. I have worked with him in the same project and in the same team, he is an excellent developer who is not afraid of difficult tasks. He is very involved in the project, participating in weekly meetings with the PO, PBR, sprint planning, retro and sprint review sessions.
        He also mastered his skills by successfully completing various assignments and tasks even when initially he was unfamiliar with the functionality which required extra time and efforts
        Also, Ashot is a hard-working and responsible person. I think he has enough experience and skills to do the more challenging tasks and roles.      
      `
    }
  ];
  isSeparatePage: boolean;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.isSeparatePage = this.activatedRoute.snapshot.data['isSeparatePage'];
  }
}
