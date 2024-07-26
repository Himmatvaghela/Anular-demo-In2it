import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor() {}

  source_graph = [
    {
      sourceName: 'Direct',
      value: 309,
    },

    {
      sourceName: 'Cross Sales',
      value: 97,
    },

    {
      sourceName: 'Portal Enquiry',
      value: 7,
    },
  ];

  certainity = [
    {
      name: 'Extremly High',
      value: 10,
    },
    
    {
      name: 'High',
      value: 32,
    },

    {
      name: 'Moderate',
      value: 47,
    },

    {
      name: 'Low',
      value: 28,
    },

    {
      name: 'Almost Lost',
      value: 2,
    },
  ];
  sales_ticket_per_owner = [
    {
      user_name: 'Tinku Sharma',
      total_ticket: 89,
    },

    {
      user_name: 'Vishal Mishra',
      total_ticket: 3,
    },

    {
      user_name: 'Pawna Kumare',
      total_ticket: 19,
    },

    {
      user_name: 'Shivank Tyagi',
      total_ticket: 36,
    },

    {
      user_name: 'Vikash Tiwari123',
      total_ticket: 6,
    },

    {
      user_name: 'Vikash Tiwari',
      total_ticket: 5,
    },

    {
      user_name: 'Ankit Tyagi',
      total_ticket: 90,
    },
  ];
  Sales_request_per_variant = [
    {
      name: 'Bronze',
      count: 18,
    },

    {
      name: 'Gold',
      count: 48,
    },

    {
      name: 'Silver',
      count: 94,
    },

    {
      name: 'Best Effort',
      count: 27,
    },

    {
      name: 'Platinum',
      count: 4,
    },
  ];

  sales_funnel = [
    {
      name: 'Lead',
      count: 413,
      percentage: '27%',
    },

    {
      name: 'Opportunity',
      count: 113,
      percentage: '76%',
    },

    {
      name: 'Quotation',
      count: 86,
      percentage: '58%',
    },

    {
      name: 'Order',
      count: 50,
      percentage: '0%',
    },
  ];
}
