import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  newsSites = [
    {
      name: 'BBC',
      url: 'https://www.bbc.com/news/topics/c88k8ykk6ygt',
      logo: 'assets/imgs/BBC_Logo.svg'
    },
    {
      name: 'THE INDEPENDENT',
      url: 'https://www.independent.co.uk/topic/food-allergies',
      logo: 'assets/imgs/THE_INDEPENDENT_Logo.png'
    },
    {
      name: 'THE CONVERSATION',
      url: 'https://theconversation.com/europe/topics/food-allergies-8779',
      logo: 'assets/imgs/THE_CONVERSATION_Logo.png'
    },
    {
      name: 'NEWS-MEDICAL',
      url: 'https://www.news-medical.net/?tag=/Food-Allergy',
      logo: 'assets/imgs/NEWS_MEDICAL_Logo.png'
    },
  ];

  constructor( ) { }

  async openSite(url: string) {
    await Browser.open({ url: url });
  }

  ngOnInit() { }

}