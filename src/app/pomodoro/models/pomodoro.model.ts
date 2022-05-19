export interface IPomodoro {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  success: boolean;
}

export interface IEditPomodoro {
  name: string;
  description: string;  
}

export interface ICreatePomodoro {
  name: string;
  description: string;
  start: string;
  duration: number;
}

export interface ITimer {
  duration: number;
}
