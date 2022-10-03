import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss'],
})
export class DispatchComponent implements OnInit {
  headArrayList = [
    { Head: 'Player Name', FieldName: 'playerName' },
    { Head: 'Country Name', FieldName: 'playerCountry' },
    { Head: 'Club Name', FieldName: 'playerClub' },
    { Head: 'Action', FieldName: '' },
  ];
  jsonData: any = [
    {
      playerName: 'Cristiano Ronaldo',
      playerCountry: 'Pourtgal',
      playerClub: 'Juventus',
    },
    {
      playerName: 'Lionel Messi',
      playerCountry: 'Argentina',
      playerClub: 'Barcelona',
    },
    {
      playerName: 'Neymar Junior',
      playerCountry: 'Brazil',
      playerClub: 'PSG',
    },
    {
      playerName: 'Tonni Kroos',
      playerCountry: 'Germany',
      playerClub: 'Real Madrid',
    },
    {
      playerName: 'Paul Pogba',
      playerCountry: 'France',
      playerClub: 'Manchester United',
    },
    {
      playerName: 'Sergio Ramos',
      playerCountry: 'Espain',
      playerClub: 'Real Madrid',
    },
    {
      playerName: 'H. Kane',
      playerCountry: 'England',
      playerClub: 'Tottanhum',
    },
    {
      playerName: 'Luiz Suarez',
      playerCountry: 'Urgway',
      playerClub: 'Atletico Madrid',
    },
    {
      playerName: 'Eden Hazard',
      playerCountry: 'Belgium',
      playerClub: 'Real Madrid',
    },
    {
      playerName: 'Vinicious Junior',
      playerCountry: 'Brazil',
      playerClub: 'Real Madrid',
    },
    {
      playerName: 'Karim Benzema',
      playerCountry: 'France',
      playerClub: 'Real Madrid',
    },
    {
      playerName: 'Ant. Grizzeman',
      playerCountry: 'France',
      playerClub: 'Barcelona',
    },
    {
      playerName: 'Sadio Mane',
      playerCountry: 'NA',
      playerClub: 'Liverpool',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  editUser(item: any) {
    console.log(item);
  }
  DeleteUser(item: any) {
    console.log(item);
  }
}
