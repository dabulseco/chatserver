import { useEffect, useState } from 'react'
import ProfileInfo from './components/profile-info';
import NewDm from './components/new-dm'
import { apiClient } from '@/lib/api-client';
import { GET_DM_CONTACTS_URL, GET_USER_CHANNEL_URL } from '../../../../utils/constants';
import { useAppStore } from '@/store';
import ContactList from '@/components/contact-list';
import CreateChannel from './components/create-channel';

const ContactsContainer = () => {
  const { setDirectMessagesContacts, setChannels, directMessagesContacts, channels } = useAppStore();
  useEffect(() => {
    const getContact = async() => {
      const response = await apiClient.get(GET_DM_CONTACTS_URL, { withCredentials: true });
      if (response.status === 200 && response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };

    const getChannels = async() => {
      const response = await apiClient.get(GET_USER_CHANNEL_URL, { withCredentials: true });
      if (response.status === 200 && response.data.channels) {
        setChannels(response.data.channels);
      }
    };
    getContact();
    getChannels();
  }, [])
  
  return (
     <div className="relative md:w-[35vw] lg:w=[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="flex p-5 justify-start items-center gap-2">
        <Logo />
      </div>
      <div className='my-5'>
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages"/>
          <NewDm />
        </div>
        <div className="max-d-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className='my-5'>
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels"/>
          <CreateChannel />
        </div>
        <div className="max-d-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}
export default ContactsContainer;

const Logo = () => {
  return (
    <svg height="40" width="200" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="30" fill="#FFC107" stroke="#f59e0b" fontSize="35">Chat App</text>
    </svg>
  )
};

const Title = ({text}) => {
  return(
    <h6 className="uppercase tracking-widest text-neutral-100 pl-6 front-light text-opacity-90 text-sm">{text}</h6>
  )
}