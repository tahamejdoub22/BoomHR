export interface Country {
    name?: string;
    code?: string;
  }
  
  export interface Representative {
    name?: string;
    image?: string;
  }
  
  export interface Customer {
    id?: number;
    name?: string;
     role: string;

    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    aplicants?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: boolean;
  }
  