const productsUrl = "https://67ce8aee125cd5af757ae569.mockapi.io/products";


const formatPrice = (price: number): string => {
  let formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2) as unknown as number);
  return formattedPrice;
};

const getElement = (selection: string): Element => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error('해당 요소가 존재하지 않습니다.')
}

//반환값 배열임을 보장하기위해 any[]
const getStorageItem = (key: string): any[] => {
  let storageItem = localStorage.getItem(key); // 1️⃣ localStorage에서 key 값으로 데이터를 가져옴

  return storageItem ? JSON.parse(storageItem) : []; // 2️⃣ 데이터가 존재하면 JSON 문자열을 객체로 변환
};

const setStorageItem = (name: string, item: object): void => {
  localStorage.setItem(name, JSON.stringify(item));
};

export {
  productsUrl,
  formatPrice,
  getElement,
  getStorageItem,
  setStorageItem
};