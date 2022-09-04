import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import styled from 'styled-components';

const RegisterList = () => {
  const [productData, setProductData] = useState([]);

  // 가공데이터 만들기
  let manufacturedData = [];

  productData.forEach(obj => {
    const updatedArr = [];

    updatedArr.push({ ...obj, type: 'product' });

    obj.options.forEach((option, idx) => {
      if (idx === 0) {
        return;
      }
      updatedArr.push({ ...option, type: 'option' });
    });
    manufacturedData = [...manufacturedData, ...updatedArr];
  });

  // get요청
  const getRequest = async () => {
    const response = await axios('/data.json');
    setProductData(response.data.products_list);
  };

  useEffect(() => {
    getRequest();
  }, []);

  // 삭제
  const onClickDelBtn = clickedId => {
    const isDelete = window.confirm('상품을 삭제하시겠습니까?');
    if (isDelete) {
      setProductData(prev => {
        return prev.filter(data => data.id !== clickedId);
      });
    }
  };

  // show수정
  const onClickShowBtn = clickedId => {
    const isShowCheck = window.confirm('상품을 노출상태를 변경하시겠습니까?');
    if (isShowCheck) {
      setProductData(prev =>
        prev.map(data => {
          if (data.id === clickedId) {
            return { ...data, isShow: !data.isShow };
          }
          return data;
        })
      );
    }
  };

  // 페이지네이션 부분
  let [nowPage, setNowPage] = useState(0);

  const pageBtnClicked = idx => {
    setNowPage(idx);
  };

  const onClickArrow = type => {
    if (type === 'left') {
      setNowPage(prev => {
        return prev - 1 >= 0 ? prev - 1 : 0;
      });
    }

    if (type === 'right') {
      setNowPage(prev => {
        return prev + 1 <= 4 ? prev + 1 : 4;
      });
    }
  };

  const countPerPage = 10;
  const pageNums = Math.ceil(productData.length / countPerPage); // 5
  const pageNumsArr = Array(pageNums).fill(null); // [null,null,null,null,null]

  const FirstPageData = productData.slice(0, countPerPage);

  const [clickedData, setClickedData] = useState(FirstPageData);

  useEffect(() => {
    const pageDataArr = productData.slice(
      nowPage * countPerPage,
      nowPage * countPerPage + countPerPage
    );
    setClickedData(pageDataArr);
  }, [productData, nowPage]);

  // 필터 관련
  // const [filterValue, setFilterValue] = useState({ product: '', show: '' });

  // const onChange = e => {
  //   const { name, value } = e.target;
  //   setFilterValue(prev => ({ ...prev, [name]: value }));
  // };

  // const onClickSearch = () => {
  //   const filterData = productData.filter(data => `${data.isShow}` === filterValue.show);
  //   setProductData(filterData);
  // };

  return (
    <Container>
      {/* <FilterBox>
        <label htmlFor="productSearch">
          상품명
          <input
            type="text"
            id="productSearch"
            name="product"
            placeholder="상품명 검색"
            onChange={e => onChange(e)}
          />
        </label>

        <label htmlFor="statusFilter">
          상태
          <select id="statusFilter" name="statusFilter" onChange={e => onChange(e)}>
            <option value="">전체</option>
            <option value="isSoldout">품절</option>
            <option value="isDiscount">할인</option>
            <option value="isRecommend">MD추천</option>
            <option value="isBest">Best</option>
            <option value="isPending">준비중</option>
          </select>
        </label>

        <label htmlFor="show">
          상품 노출
          <select id="show" name="show" onChange={e => onChange(e)}>
            <option value="">전체</option>
            <option value="true">on</option>
            <option value="false">off</option>
          </select>
        </label>

        <button type="button" onClick={onClickSearch}>
          검색
        </button>
      </FilterBox> */}

      <table>
        <tbody>
          <tr>
            {TITLES.map((data, idx) => (
              <TableTitle key={idx} width={data.width}>
                {data.title}
              </TableTitle>
            ))}
          </tr>
          {manufacturedData.map((data, idx) => {
            if (data.type === 'product') {
              const rowLength = data.options.length ? data.options.length : 1;
              return (
                <tr key={data.id}>
                  <TdEL rowSpan={rowLength}>
                    <DeleteBtn onClick={() => onClickDelBtn(data.id)}>
                      <HiOutlineTrash />
                    </DeleteBtn>
                  </TdEL>
                  <TdEL rowSpan={rowLength}>{data.id}</TdEL>
                  <TdEL rowSpan={rowLength}>
                    <TableImg src={data.img[0]} alt={data.title} />
                  </TdEL>
                  <TdEL rowSpan={rowLength} align="left">
                    {data.title}
                  </TdEL>
                  <TdEL align="left">
                    {data.options.length > 0 ? data.options[0].productName : ''}
                  </TdEL>
                  <TdEL>{data.options.length > 0 ? data.options[0].price : data.discount}</TdEL>
                  <TdEL>{data.options.length > 0 ? data.options[0].quantity : 70}</TdEL>
                  <TdEL rowSpan={rowLength}>{data.delivery_method}</TdEL>
                  <TdEL rowSpan={rowLength}>{data.delivery_fee}</TdEL>
                  <TdEL rowSpan={rowLength}>
                    {data.status.isSoldout && <Status>품절</Status>}
                    {data.status.isDiscount && <Status>할인</Status>}
                    {data.status.isBest && <Status>Best</Status>}
                    {data.status.isPending && <Status>준비중</Status>}
                  </TdEL>
                  <TdEL rowSpan={rowLength}>2022.09.01</TdEL>
                  <TdEL rowSpan={rowLength}>
                    <ShowBtn onClick={() => onClickShowBtn(data.id)} isShow={data.isShow}>
                      {data.isShow ? 'on' : 'off'}
                    </ShowBtn>
                  </TdEL>
                </tr>
              );
            } else {
              return (
                <tr key={Date.now() + Math.random() + idx} style={{ width: '100px' }}>
                  <TdEL align="left">{data.productName}</TdEL>
                  <TdEL>{data.price}</TdEL>
                  <TdEL>{data.quantity}</TdEL>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <PageButtonWrapper>
        <PageButtons>
          <PageButton onClick={() => onClickArrow('left')}>이전</PageButton>
          {pageNumsArr.map((_, idx) => (
            <PageButton key={idx} onClick={() => pageBtnClicked(idx)}>
              {idx + 1}
            </PageButton>
          ))}
          <PageButton onClick={() => onClickArrow('right')}>다음</PageButton>
        </PageButtons>
      </PageButtonWrapper>
    </Container>
  );
};

const TITLES = [
  { title: '삭제', width: 45 },
  { title: '품번', width: 50 },
  { title: '이미지', width: 200 },
  { title: '상품명', width: 300 },
  { title: '상품 옵션', width: 250 },
  { title: '가격(할인가)', width: 120 },
  { title: '재고', width: 90 },
  { title: '배송방법', width: 110 },
  { title: '배송비', width: 110 },
  { title: '상태', width: 230 },
  { title: '마지막 수정일', width: 120 },
  { title: '상품노출', width: 80 },
];

const Container = styled.div`
  margin: 2rem;
  background-color: aliceblue;
`;

const FilterBox = styled.div`
  border: 1px solid black;
  width: 95%;
  height: 100px;
  margin-bottom: 50px;
`;

const Label = styled.label`
  //
`;

// const input = styled.input`
//   //
// `;

const TableTitle = styled.td`
  border: 0.7px solid black;
  vertical-align: middle;
  height: 30px;
  padding-left: 4px;
  text-align: center;
  width: ${prop => prop.width}px;
`;

const TableImg = styled.img`
  width: 160px;
  height: 160px;
`;

const TdEL = styled.td`
  border: 0.7px solid black;
  height: 50px;
  padding: 0 5px;
  vertical-align: middle;
  text-align: ${prop => (prop.align ? prop.align : 'center')};
`;

const DeleteBtn = styled.button.attrs({ type: 'button' })`
  color: #d40303;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

const ShowBtn = styled.button.attrs({ type: 'button' })`
  background-color: ${prop => (prop.isShow ? 'green' : 'gray')};
  color: white;
  border-radius: 20px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

const PageButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const PageButtons = styled.ul`
  display: flex;
`;

const PageButton = styled.button`
  background-color: inherit;
  border: 1px solid black;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
`;

const Status = styled.span`
  /* display: inline-block; */
  padding: 5px;
  border: 0.8px solid green;
  border-radius: 30%;
  margin-right: 5px;
`;

export default RegisterList;
