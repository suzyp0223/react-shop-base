import '../../assets/css/search.css'

import { IProduct, productsList } from "../../store/products"; // ✅ 상품 인터페이스 가져오기
import React, { useState } from "react";
// import { useRecoilValue } from "recoil";
import { useRecoilValueLoadable } from "recoil";

const Search = () => {
  const productsLoadable = useRecoilValueLoadable(productsList); //상품데이터 가져오기
  const [search, setSearch] = useState<string>('');  // 검색어 상태
  const [filteredResults, setFilteredResults] = useState<IProduct[]>([]);  // 필터링 결과

  if (productsLoadable.state === "loading") {
    return <div className="search-container">🔄 상품 정보를 불러오는 중...</div>;
  }
  if (productsLoadable.state === "hasError") {
    return <div className="search-container">❌ 상품 데이터를 불러오는 데 실패했습니다.</div>;
  }

  const products = productsLoadable.contents;

  // 🔍 검색어 입력 시 실행되는 함수
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    setSearch(value);

    if (value) {
      // ✅ store에서 title이 검색어를 포함하는 상품 필터링
      const results = products.filter((item) =>
        item.title.toLowerCase().includes(value)
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]); // 입력이 없으면 검색 결과 초기화
    }
  };

  return (
    <div className="search-container">
      {/* 검색 입력창 */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="검색"
          className="NavSearch"
        />

      {/* 🔽 검색 결과 리스트 */}
      {search && filteredResults.length > 0 && (
        <ul className="search-results">
          {filteredResults.map((product) => (
            <li key={product.id} className="search-item">
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Search;
