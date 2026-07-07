/* Bento layout: 2 big + 4 small tiles (noteworthy-style). */
export const PROJECTS = [
  {
    name: 'Pratej Dental Care',
    mark: 'PD',
    tags: 'Website Development · UI/UX Design',
    size: 'b1',
    gradient: 'linear-gradient(135deg, #11382F 0%, #3DBC9E 60%, #E8F7F4 100%)',
    url: 'https://www.pratejdentalcare.com',
    designUrl:
      'https://www.figma.com/design/ypOC4RlHSaATp7YSPYvGVg/Untitled?node-id=0-1&p=f&t=JnV8xrq9hbMJQRxr-0',
    mockups: {
      laptop: '/images/pratej_web_nobg_mock.png',
      mobile: '/images/pratej_mobile_mock_removedbg.png',
    },
  },
  {
    name: 'Fernhaus',
    mark: 'FH',
    tags: 'E-commerce · Art direction',
    size: 's1',
    gradient: 'linear-gradient(135deg, #14231c 0%, #3f6b4f 60%, #a8c8a0 100%)',
  },
  {
    name: 'Kinetiq',
    mark: 'KQ',
    tags: 'Product · UI/UX · Motion',
    size: 's2',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a52 55%, #b9b9c4 100%)',
  },
  {
    name: 'Solace',
    mark: 'SO',
    tags: 'Brand identity · Website',
    size: 's3',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #f97316 55%, #fed7aa 100%)',
  },
  {
    name: 'Sphoorthi Interiors',
    mark: 'SI',
    tags: 'Website Development',
    size: 'b2',
    gradient: '#9ea09e',
    url: 'https://www.sphoorthiinteriors.com',
    mockups: {
      single: '/images/updated_sphoorthi.png',
    },
  },
  {
    name: 'Sri Gowri Dental Care',
    mark: 'SG',
    tags: 'Website Development',
    size: 's4',
    gradient: '#9a9da0',
    url: 'https://www.srigowridentalcare.com',
    mockups: {
      single: '/images/srigowri_mockup.jpg',
    },
  },
];

export const PROJECT_GRID_SPAN = {
  b1: 'col-[1/8] row-[1/3]',
  s1: 'col-[8/13] row-[1/2]',
  s2: 'col-[8/13] row-[2/3]',
  s3: 'col-[1/6] row-[3/4]',
  b2: 'col-[6/13] row-[3/5]',
  s4: 'col-[1/6] row-[4/5]',
};
