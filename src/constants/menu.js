const MY_MENU_LIST = [
  {
    label: '포인트',
    imgSrc: 'images/coin.png',
  },
  {
    label: '쿠폰',
    imgSrc: 'images/coupon.png',
  },
  {
    label: '선물함',
    imgSrc: 'images/gift.png',
  },
  {
    label: '찜',
    imgSrc: 'images/heart.png',
  },
  {
    label: '주문내역',
    imgSrc: 'images/receipt.png',
  },
  {
    label: '리뷰관리',
    imgSrc: 'images/review.png',
  },
];

const MENU_LIST = [
  {
    title: '배민페이 등록',
    description: '배민페이로 결제하면 최대 5.5% 배민포인트가 적립됩니다.',
    isNew: true,
  },
  {
    title: '가족계정 관리',
    description: '결제수단을 공유해 우리 가족의 끼니를 챙겨주세요.',
    isNew: true,
  },
  {
    title: '공지사항',
  },
  {
    title: '배민커넥트 지원',
  },
];

module.exports = { MY_MENU_LIST, MENU_LIST };
