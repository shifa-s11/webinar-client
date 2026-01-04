export interface Webinar {
  _id: string;
  title: string;
  description: string;
  scheduledAt: string;
  attendeeCount: number;
}

export interface Attendee {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  attendees:[],
}
