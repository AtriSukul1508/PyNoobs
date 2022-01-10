import React, { useState } from 'react';
import { useChatContext as uCC} from 'stream-chat-react';

import { UserList } from '.';
import { CloseCreateChannel as CCC } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Group name</p>
            <input value={channelName} onChange={handleChange} placeholder="group-name" />
            <p>Add Users</p>
        </div>
    )
}

const EditChannel = ({ setIsEditing }) => {
    const { channel } = uCC();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([])

    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if(nameChanged) {
            await channel.update({ name: channelName }, { text: `Group name changed to ${channelName}`});
        }

        if(selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    return (
        <div className="edit-channel__container" >
            <div className="edit-channel__header">
                <p>Edit Group Information</p>
                <CCC setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save</p>
            </div>
        </div>
    )
}

export default EditChannel
