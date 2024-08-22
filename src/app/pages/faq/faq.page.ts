import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  faq = [
    {
      question: 'What is a food allergy?',
      answer: 'A food allergy is a condition that occurs when the immune system overreacts to a particular food. This can cause allergic reactions in the body, with symptoms ranging from mild to severe.'
      },
    {
      question: 'What are the most common food allergens?',
      answer: 'The most common food allergens include milk, eggs, peanuts, tree nuts (walnuts, almonds, etc.), fish, shellfish, wheat and soy.'
      },
    {
      question: 'What are the symptoms of food allergy?',
      answer: 'Symptoms of food allergy may include: skin rash and itching, hives, swelling of the lips, tongue or throat, shortness of breath, nausea, vomiting, abdominal pain and anaphylaxis (severe allergic reaction).'
    },
    {
      question: 'What is anaphylaxis and how to recognize it?',
      answer: 'Anaphylaxis is a severe life-threatening allergic reaction. Symptoms include rapid pulse, low blood pressure, difficulty breathing, loss of consciousness and severe skin rashes. It requires urgent medical attention.'
    },
    {
      question: 'How is food allergy diagnosed?',
      answer: 'Food allergies are usually diagnosed by an allergist using methods such as skin tests, blood tests or elimination diets. The doctor also assesses the patients medical history and symptoms.'
    },
    {
      question: 'How to manage food allergies?',
      answer: 'Food allergy management includes avoiding allergenic foods. It is also important to have emergency treatment tools such as an epinephrine auto-injector (EpiPen) for severe allergic reactions.'
    },
    {
      question: 'How are allergens indicated on labels?',
      answer: 'In many countries, allergens must be clearly indicated on food labels. On labels, allergens are usually highlighted in bold or in a different font in the “ingredients” section.'
    },
    {
      question: 'How to manage food allergies in restaurants and when eating out?',
      answer: 'When eating in restaurants, you can manage your food allergies by asking if allergens are present or by specifying your special dietary requirements. It is important to tell waiters or chefs about your allergy and ask how it is prepared.'
    },
    {
      question: 'What is the difference between food intolerance and food allergy?',
      answer: 'Food allergy occurs when the immune system overreacts to food and can lead to serious reactions. Food intolerance is related to the digestive system, usually with milder symptoms (bloating, gas, diarrhea) and does not involve the immune system.'
    },
    {
      question: 'Does food allergy in children go away?',
      answer: 'Some children, especially those with allergies such as milk, egg, wheat and soy, may outgrow these allergies as they get older. However, allergies to peanuts, tree nuts, fish and shellfish can often last a lifetime.'
    },
  ];

  constructor() { }

  ngOnInit() { }

}