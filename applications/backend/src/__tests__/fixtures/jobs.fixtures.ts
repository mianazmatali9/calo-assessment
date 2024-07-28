import { Job } from "../../types/job.type";

export const jobs: Job[] = [
  { id: '01J3QRW2PZTZPGZMNF0CB9TJIG', status: 'pending' },
  { id: '0J3QRW2PZTZPGZMPOHSQD0CB9T', status: 'failed' },
  {
    id: '01J3QRW2PZTZPGZMNF6QD0CB9T',
    status: 'resolved',
    result: {
      id: 'M4KpA7NC-l0',
      slug: 'person-holding-bowl-of-grapes-M4KpA7NC-l0',
      urls: {
        raw: 'https://images.unsplash.com/photo-1473229903343-d7903343f6c0?ixid=M3w2MzY2NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjIwMDU5OTh8&ixlib=rb-4.0.3',
        full: 'https://images.unsplash.com/photo-1473229903343-d7903343f6c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MzY2NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjIwMDU5OTh8&ixlib=rb-4.0.3&q=85',
        regular:
          'https://images.unsplash.com/photo-1473229903343-d7903343f6c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzY2NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjIwMDU5OTh8&ixlib=rb-4.0.3&q=80&w=1080',
        small:
          'https://images.unsplash.com/photo-1473229903343-d7903343f6c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzY2NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjIwMDU5OTh8&ixlib=rb-4.0.3&q=80&w=400',
        thumb:
          'https://images.unsplash.com/photo-1473229903343-d7903343f6c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzY2NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjIwMDU5OTh8&ixlib=rb-4.0.3&q=80&w=200',
        small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1473229903343-d7903343f6c0',
      },
    },
  },
];
