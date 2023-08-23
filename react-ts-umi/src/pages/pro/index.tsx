import React, { useEffect, useState } from 'react'
import {getProList} from '../../api/pro'

import {Table, Image} from 'antd'

type Props = {}

interface IPro {
  banners: string[]
  brand: string
category : string
desc: string
discount: number
img1: string
img2: string
img3: string
img4: string
isrecommend: number
issale: number
isseckill: number
originprice: number
proid: string
proname: string
sales: number
stock: number
}

const Index: React.FC = (props: Props) => {

  const [proList,setProList] = useState()

  useEffect(()=>{
    getProList().then(res => {
      console.log(res);
      setProList(res.data)
    })
  }, [])

  const columns = [{
    title: '序号',
    render(t: any,r: IPro,i: number){
      return <span>{i + 1}</span>
    }
  },{
    title: '商品名称',
    dataIndex: 'proname'
  },{
    title: '商品图片',
    render(t: any,r: IPro){
      return <Image src={r.img1} height={50} />
    }
  }]
    
  return (
    <div>
      <h1>商品列表</h1>
      <Table dataSource={proList} rowKey='proid' columns={columns} />
    </div>
  )
}

export default Index