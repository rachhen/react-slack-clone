import React from 'react';
import { Segment, Header, Icon, Input } from 'semantic-ui-react';

class MessagesHeader extends React.Component {
    render() {
        const {
            channelName,
            numUniqueUser,
            handleSearchChange,
            searchLoading,
            handleStar,
            isChannelStarred
        } = this.props;

        return (
            <Segment clearing>
                {/* Header Title */}
                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                    <span>
                        {channelName}
                        {!this.props.isPrivateChannel && (
                            <Icon
                                onClick={handleStar}
                                name={isChannelStarred ? 'star' : 'star outline'}
                                color={isChannelStarred ? 'yellow' : 'black'}
                            />
                        )}
                    </span>
                    <Header.Subheader>{numUniqueUser}</Header.Subheader>
                </Header>

                {/* Channel Search Input */}
                <Header floated="right">
                    <Input
                        onChange={handleSearchChange}
                        loading={searchLoading}
                        size="mini"
                        icon="search"
                        name="searchTerm"
                        placeholder="Search Messages"
                    />
                </Header>
            </Segment>
        );
    }
}

export default MessagesHeader;
