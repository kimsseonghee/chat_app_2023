import React from 'react'
import { FaAddressBook, FaMobileAlt } from 'react-icons/fa';
import { TbQrcode } from 'react-icons/tb';
import { RxEnvelopeClosed } from 'react-icons/rx';
import '../styles/Find.scss';
import Tab from '../components/Tab';
import Header from 'components/Header';

function Find() {
  return (
  <>
    <Header></Header>
      <div className='title_bar'>
        <h1>
          Find
        </h1>
        <div className='left_item'><a href="#">
        </a></div>
        <div className='right_item'><a href="#"></a></div>
      </div>

  <main>
    <ul className='find_method'>
      <li><a href='#'><FaAddressBook/>Find</a></li>
      <li><a href='#'><TbQrcode/> QR Code</a></li>
      <li><a href='#'><FaMobileAlt/>Shake</a></li>
      <li><a href='#'><RxEnvelopeClosed/>Invite via SNS</a></li>
    </ul>
  </main>
  <Tab></Tab>
  </>
  )
}

export default Find