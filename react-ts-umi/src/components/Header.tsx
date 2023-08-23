import React from 'react'
import {Button} from 'antd'

import {connect,history} from 'umi'

// import {connect} from 'dva'

type Props = {
  adminname: string
}

const Header: React.FC<Props> = (props: Props) => {
  return (
    <header>
      {
        props.adminname ?
         (<p> 欢迎 {props.adminname} <Button onClick={()=>{
          localStorage.clear()
          history.push('/login')
         }}>退出登录</Button> </p>) : 
         (<p><Button onClick={()=>{
          history.push('/login')
         }}>请登录</Button></p>)
      }
       
    </header>
  )
}

export default connect(({admin}: {admin: Props})=>{
  return {
    adminname: admin.adminname
  }
})(Header)