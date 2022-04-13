/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  env: {
    ACCOUNT_HEADER : ["No","거래일시","의뢰인/수취인","출금액(원)","입금액(원)","잔액(원)","출금계좌메모","적요","처리점","구분"],
    DEPOSIT_CONDITIONS : [{head: "처리점",type: "equal",val: "노원종",},{head: "처리점",type: "equal",val: "송림동"}],
    WITHDRAW_CONDITIONS : [
    [
      {
        head: "출금계좌메모",
        type: "equal",
        val: ["화수방아간","홈마트　송림점","강동수산","인농177번상회","청우상회72","화도정육점","중앙떡집"],
      },
      {
        head: "의뢰인/수취인",
        type: "equal",
        val: ["홈마트송림점","화도정육점","이삭토스트","에그드랍신포점","신라반점"],
      }
    ],
    {
      head: "적요",
      type: "equal",
      val: ["CMS 공동","FBS출금"],
    },
    {
      head: "적요",
      type: "equal",
      val: ["공과금","지로출금"],
    },
    {
      head: "출금계좌메모",
      type: "include",
      val: ["급여","퇴직적립금"],
    },
    {
      head: "출금계좌메모",
      type: "include",
      val: ["가정간호","약값","정산","환불"],
    },
    {
      head: "출금계좌메모",
      type: "include",
      val: ["보험"],
    },
  ]

  },
}

module.exports = nextConfig
