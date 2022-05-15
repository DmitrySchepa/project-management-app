interface IAssignedUser {
  name: string;
}


export interface IFoundedTask {
  "id": string;
  "title": string;
  "done": boolean;
  "order": number;
  "description": string;
  "userId": string | null;
  "boardId": string;
  "columnId": string;
  "user": IAssignedUser | null;
}
