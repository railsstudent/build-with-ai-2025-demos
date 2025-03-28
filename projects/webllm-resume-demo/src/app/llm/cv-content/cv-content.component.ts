import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cv-content',
  imports: [FormsModule],
  template: `
    <label for="cv">CV:&nbsp;&nbsp;</label>
    <textarea name="cv" id="cv" [(ngModel)]="cv"></textarea>
  `,
  styles: `
  textarea {
    width: 100%;
    height: 20rem;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvContentComponent {
  cv = signal(`Connie Leung
(555) 123-4567 | connie.leung@email.com | linkedin.com/in/connieleung | github.com/connieleung | connieleung.portfolio.com

Summary
Highly motivated and results-oriented Frontend Engineer with 6+ years of experience specializing in building and maintaining responsive, user-friendly web applications. Proficient in modern JavaScript frameworks, particularly Vue 3 and Nuxt.js, with a strong understanding of core web technologies including HTML, CSS, and JavaScript/TypeScript. Passionate about clean code, performance optimization, and delivering exceptional user experiences. Experienced in collaborative Agile environments and eager to contribute to innovative projects. Quick learner with a demonstrated ability to adapt to new technologies and challenges, including a recent focus on serverless architectures.

Skills
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
- Frameworks/Libraries: Vue 3 (Composition API, Vue Router, Pinia), Quasar, Nuxt.js, React, Redux, Material-UI
- Styling: Tailwind CSS, SCSS, CSS Modules, Styled Components
- State Management: Pinia, Redux
- Build Tools/Package Managers: Vite, npm
- Testing: Jest, Vitest, Cypress, Playwright
- Version Control: Git (GitHub, GitLab)
- Responsive Design: Mobile-First Development, Media Queries, Container Queries
- Accessibility: WCAG 2.1 guidelines, ARIA attributes
- Other: RESTful APIs, JSON, Agile methodologies (Scrum, Kanban), CI/CD (GitHub Actions), Figma, Serverless Functions
- Deployment:  Github Page, Netlify

Experience
Innovate Solutions, San Francisco, CA – Senior Frontend Engineer 2023 – Present
- Led the development of a new marketing website using Nuxt.js 3 and TypeScript, resulting in a 20% increase in lead generation.
- Implemented serverless functions for form submissions and data processing, improving scalability and reducing costs.
- Mentored junior developers and provided technical guidance on best practices.
- Collaborated with designers to create a visually appealing and user-friendly interface.

Tech Solutions Inc., San Francisco, CA – Frontend Engineer 2021 – 2023 (2 years)
- Led the development of a new user dashboard feature using Vue 3 and TypeScript, resulting in a 15% increase in user engagement.
- Implemented responsive designs using Tailwind CSS, ensuring optimal user experience across all devices.
- Wrote unit and integration tests using Jest and Cypress, achieving 90% test coverage.
- Optimized frontend performance by implementing lazy loading of images, improving initial page load times by 20%.

WebDev Innovations, New York, NY – Junior Frontend Developer 2019 – 2021 (2 years)
- Developed and maintained key features for a React-based e-commerce application, utilizing Redux for state management and Material-UI.
- Improved website accessibility by implementing ARIA attributes and adhering to WCAG guidelines.
- Assisted senior developers in debugging and resolving frontend issues.
- Creative Digital Agency, Austin, TX – Frontend Developer Intern 2017 – 2019 (2 years)
- Developed and implemented user interface components for client websites using HTML, CSS, and JavaScript.
- Gained experience with responsive web design principles and cross-browser compatibility testing.
- Contributed to the development of website templates using Bootstrap.
- Learned about version control using Git and collaborated on team projects using GitHub.    
`);
}
