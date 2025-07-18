import type { Report, Comment, ReportCategory } from '../types';

export const REPORT_CATEGORIES: { value: ReportCategory; label: string }[] = [
  { value: 'school_route', label: 'School Route' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'traffic', label: 'Traffic' },
  { value: 'abandoned_building', label: 'Abandoned Building' },
  { value: 'noise', label: 'Noise' },
  { value: 'vandalism', label: 'Vandalism' },
  { value: 'loitering', label: 'Loitering' },
  { value: 'wild_dumping', label: 'Wild Dumping' },
  { value: 'other', label: 'Other' },
];

const dummyComments: Comment[] = [
  {
    id: '1',
    userId: 'user2',
    userName: 'Sarah Johnson',
    content: 'I noticed this too. It\'s been getting worse lately.',
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    userId: 'user3',
    userName: 'Mike Chen',
    content: 'Already reported to the city. They said they\'ll look into it.',
    createdAt: new Date('2024-01-16T14:20:00'),
  },
];

export const dummyReports: Report[] = [
  {
    id: '1',
    title: 'Unsafe crossing near elementary school',
    description: 'Children have to cross a busy road without proper traffic lights or crossing guards.',
    category: 'school_route',
    location: { lat: 52.5170, lng: 13.4000 },
    status: 'published',
    votes: { supports: 12, userSupport: true },
    comments: dummyComments,
    createdAt: new Date('2024-01-14T09:15:00'),
    userId: 'user1',
    userName: 'John Doe',
  },
  {
    id: '2',
    title: 'Broken streetlight on Main Street',
    description: 'The streetlight has been out for weeks, making the area dangerous at night.',
    category: 'lighting',
    location: { lat: 52.5190, lng: 13.4050 },
    status: 'published',
    votes: { supports: 8 },
    comments: [],
    createdAt: new Date('2024-01-13T18:45:00'),
    userId: 'user2',
    userName: 'Sarah Johnson',
  },
  {
    id: '3',
    title: 'Heavy traffic congestion during rush hour',
    description: 'Intersection becomes completely gridlocked, affecting emergency vehicles.',
    category: 'traffic',
    location: { lat: 52.5220, lng: 13.4100 },
    status: 'pending',
    votes: { supports: 15 },
    comments: [dummyComments[0]],
    createdAt: new Date('2024-01-12T16:30:00'),
    userId: 'user3',
    userName: 'Mike Chen',
  },
  {
    id: '4',
    title: 'Abandoned warehouse attracting vandals',
    description: 'Old warehouse has been empty for years and is now covered in graffiti.',
    category: 'abandoned_building',
    location: { lat: 52.5150, lng: 13.3950 },
    status: 'published',
    votes: { supports: 6 },
    comments: [],
    createdAt: new Date('2024-01-11T12:00:00'),
    userId: 'user1',
    userName: 'John Doe',
  },
  {
    id: '5',
    title: 'Loud construction work at night',
    description: 'Construction crew working past midnight disturbing residents.',
    category: 'noise',
    location: { lat: 52.5180, lng: 13.3980 },
    status: 'resolved',
    votes: { supports: 20 },
    comments: [dummyComments[1]],
    createdAt: new Date('2024-01-10T23:15:00'),
    userId: 'user4',
    userName: 'Anna Schmidt',
  },
  {
    id: '6',
    title: 'Graffiti on public building',
    description: 'Fresh graffiti appeared on the library wall this week.',
    category: 'vandalism',
    location: { lat: 52.5210, lng: 13.4020 },
    status: 'published',
    votes: { supports: 4 },
    comments: [],
    createdAt: new Date('2024-01-09T14:30:00'),
    userId: 'user2',
    userName: 'Sarah Johnson',
  },
  {
    id: '7',
    title: 'Groups blocking store entrance',
    description: 'People hanging around the entrance making customers uncomfortable.',
    category: 'loitering',
    location: { lat: 52.5160, lng: 13.4080 },
    status: 'pending',
    votes: { supports: 7 },
    comments: dummyComments,
    createdAt: new Date('2024-01-08T11:20:00'),
    userId: 'user5',
    userName: 'Tom Wilson',
  },
  {
    id: '8',
    title: 'Illegal dumping in park area',
    description: 'Someone dumped old furniture and trash bags in the park.',
    category: 'wild_dumping',
    location: { lat: 52.5140, lng: 13.4060 },
    status: 'published',
    votes: { supports: 18 },
    comments: [dummyComments[0]],
    createdAt: new Date('2024-01-07T08:45:00'),
    userId: 'user3',
    userName: 'Mike Chen',
  },
  {
    id: '9',
    title: 'Unsafe playground equipment',
    description: 'Swing set has loose chains and needs immediate attention.',
    category: 'other',
    location: { lat: 52.5200, lng: 13.3970 },
    status: 'published',
    votes: { supports: 25, userSupport: true },
    comments: [dummyComments[1]],
    createdAt: new Date('2024-01-06T15:10:00'),
    userId: 'user1',
    userName: 'John Doe',
  },
];

export const currentUser = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  isAdmin: false,
};