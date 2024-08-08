import { Injectable } from '@angular/core';
import { Project } from '../constants/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projects: Project[] = [
    {
      id: 1,
      title: 'Dashboard builder project',
      company: 'EPAM Anywhere',
      stackUsed: 'Angular, Typescript, HTML, SCSS, JavaScript, Java, Spring, jQuery, Angular.js',
      intro: 'Dashboard builder application written in Angular for a client at EPAM.',
      previewImageSrc: '../../assets/images/projects/udb.png',
      description: `Worked on a project for one of the worlds largest multinational information conglomerates for more than two years.
      The project was an Angular application using a plugin-based architecture for creating system dashboards. The Angular application was built
      and placed inside of a larger application using shadow dom encapsulation. One of the biggest challenges for me was to find different workarounds to
      problems arising because of the use of this shadow dom architecture where many third party libraries were not working as expected with this style.
      I had to find custom ways to manually implement many of such libraries. I also took part in optimizing the current code and improved the application
      overall performance. The main work was to convert the legacy code written in Angular.js to Angular v10. Along the way the requirements were changing
      to accomodate new features which were not part of the old implementation and I also had to make sure that the existing functionality would work the same
      way as the legacy.
      The experience gained in this project has helped me in many ways. I got acquainted with the workflow in a large enterprise company. The work was done in
      two week sprints where we would estimate the tickets for the upcoming sprint and assign to respective team members. We would also have daily meetings each
      morning for status updates and after each sprint there would be a sprint retro meeting as well as a demo of the work done in the passed sprint.`
    },
    {
      id: 2,
      title: 'Fundraising application',
      company: 'Pragmatix Agency',
      stackUsed: 'Angular, HTML, SCSS, Bootstrap, Javascript, Typescript, Selenium E2E testing',
      intro: 'Admin portal for a fundraising platform for cancer treatment written in Angular ',
      previewImageSrc: '../../assets/images/projects/fundraising_app.png',
      description: `A fundraising application for people with cancer where the admin users would create different fundraising events. I worked on the 
      creation of web components for the admin side which were used for creating these fundraising events. Main responsibilities included creation of forms, integrating the form 
      values with the API, creating pages based on the design requirements.`
    },
    {
      id: 3,
      title: 'Hiring platform',
      company: 'Pragmatix Agency',
      stackUsed: 'Angular, Laravel, MySql',
      intro: 'Hiring platform with work logging and tracking written in Angular/Laravel',
      previewImageSrc: '../../assets/images/projects/hiring_platform.png',
      description: `A hiring platform where job seekers could connect with potential employers and apply for jobs. It also provided the functionality for
      tracking and logging/billing the worked hours. Frontend was Angular and the backend was Laravel. In this project I had my first experience doing
      backend work and gained experience working with SQL and PHP/Laravel.`
    },
    {
      id: 4,
      title: 'Maaksus online shop',
      company: 'Maaksus',
      stackUsed: 'Angular, Node.js, MongoDb, Express',
      intro: 'Online shop for fine art prints seller. Frontend: Angular, Backend: Node.js, Express',
      previewImageSrc: '../../assets/images/projects/maaksus_01.png',
      description: `Online shop created for a fine artprints seller. It allowed users to register, add items to a cart, select the desired art print and
      test the look on an uploaded image of their environment(e.g. living room wall). This was a personal project of mine where I learnt node.js and how
      authentication works with JWT tokens and how to authenticate users.`,
      link: ''
    },
    {
      id: 5,
      title: 'EPIU website',
      company: 'EPIU',
      stackUsed: 'Wordpress, HTML, CSS',
      intro: 'Website for the state agency EPIU',
      previewImageSrc: '../../assets/images/projects/epiu_01.png',
      description: `A website created with Wordpress for the environmental protection agency.`,
      link: 'https://www.epiu.am/'
    },
    {
      id: 6,
      title: 'Fidelis website',
      company: 'Fidelis',
      stackUsed: 'HTML/CSS/jQuery',
      intro: 'Website for Fidelis law firm',
      previewImageSrc: '../../assets/images/projects/fidelis_01.png',
      description: `A website created with HTML/CSS/Javascript/jQuery for Fidelis law firm where I utilized a mobile first approach and optimized 
      for different screen sizes.`,
      link: 'https://fidelis.am/'
    },
    {
        id: 7,
        title: 'Benetton website',
        company: 'Benetton',
        stackUsed: 'HTML/CSS/Bootstrap',
        intro: 'Website for Benetton new perfume promo',
        previewImageSrc: '../../assets/images/projects/benetton.png',
        description: `A website created with HTML/CSS and Bootstrap for Benetton for the promo of their new perfume. It is optimized for different screen sizes
        and mobile friendly.`,
        link: 'https://mk-benetton.ru/'
    }
  ];

  constructor() { }

  getProjectById(id: number): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }
}
 