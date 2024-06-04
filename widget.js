(function () {
    const css = `
        @import url("https://fonts.googleapis.com/css?family=Lato:400,400i,700");
        .dsc-widget-circle {
            width: 0.7em;
            height: 0.7em;
            margin: 0.3em;
            border-radius: 50%;
        }
        .dsc-widget-circle.dsc-widget-circle-online {
            background-color: #23A559;
        }
        .dsc-widget-circle.dsc-widget-circle-members {
            background-color: #80848E;
        }
        
        #dsc-widget-invite-container {
            height: 16em;
            width: 40em;
            margin: 0;
            border-radius: 1em;
            font-family: Lato;
            display: grid;
            background-repeat: no-repeat;
            background-size: cover;
            background-position-y: -140px;
            grid-template-rows: 33% 67%;
            grid-template-columns: 100%;
            text-align: left;
        }
        
        #dsc-widget-child1, #dsc-widget-child2 {
            width: 100%;
            height: 100%;
        }
        
        #dsc-widget-child1 {
            grid-row: 1/2;
        }
        
        #dsc-widget-child2 {
            grid-row: 2/3;
            background-color: #1a1a1a;
            display: flex;
            flex-flow: row wrap;
            gap: 16px;
            position: relative;
        }
        #dsc-widget-child2 #dsc-widget-invite-notification {
            margin: 0;
            position: absolute;
            left: calc(1.2em + 2px);
            top: 0.5em;
            color: gray;
        }
        #dsc-widget-child2 #dsc-widget-server-info {
            display: flex;
            flex: 1000 0 auto;
            align-items: center;
            max-width: 100%;
            gap: 16px;
            margin-left: 1em;
        }
        #dsc-widget-child2 #dsc-widget-server-info #dsc-widget-server-icon {
            flex: 0 0 auto;
            width: 5em;
            height: 5em;
            border-radius: 15px;
            position: relative;
            background-clip: padding-box;
            background-position: center center;
            background-size: 100% 100%;
        }
        #dsc-widget-child2 #dsc-widget-server-info #dsc-widget-server-details {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: stretch;
            min-width: 1px;
            color: white;
        }
        #dsc-widget-child2 #dsc-widget-server-info #dsc-widget-server-details h3 {
            margin: 0;
        }
        #dsc-widget-child2 #dsc-widget-server-info #dsc-widget-server-members #dsc-widget-member-counts-outer-parent {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            column-gap: 12px;
        }
        #dsc-widget-child2 #dsc-widget-server-info #dsc-widget-server-members #dsc-widget-member-counts-outer-parent .dsc-widget-member-count {
            display: flex;
            flex: 0 1 auto;
            align-items: center;
            flex-flow: nowrap;
            min-width: 0;
        }
        #dsc-widget-child2 #dsc-widget-server-info #dsc-widget-server-members #dsc-widget-member-counts-outer-parent .dsc-widget-member-count span {
            flex: 0 1 auto;
        }
        #dsc-widget-child2 #dsc-widget-join-link-container {
            flex: 1 0 auto;
            align-self: center;
            height: inherit;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 1em;
        }
        #dsc-widget-child2 #dsc-widget-join-link {
            text-decoration: none;
        }
        #dsc-widget-child2 #dsc-widget-join-btn {
            font-size: 1.5em;
            width: 5em;
            height: 2.5em;
            background-color: #248046;
            color: white;
            cursor: pointer;
            outline: none;
            border: none;
            border-radius: 0.4em;
        }
        #dsc-widget-child2 #dsc-widget-join-btn:hover {
            filter: brightness(0.8);
        }
        
    `
    const html = `
    <div id="dsc-widget-invite-container">
        <div id="dsc-widget-child1"> 
        
        </div>
        <div id="dsc-widget-child2"> 
            <h3 id="dsc-widget-invite-notification">You've been invited to join a server</h3>
            <div id="dsc-widget-server-info"> 
                <div id="dsc-widget-server-icon"></div>
                <div id="dsc-widget-server-details"> 
                <h3 id="dsc-widget-server-name">Loading...</h3>
                <span id="dsc-widget-server-members">
                    <div id="dsc-widget-member-counts-outer-parent">
                    <div id="dsc-widget-online-members" class="member-count">
                        <span class="dsc-widget-circle dsc-widget-circle-online">&nbsp;</span>
                        <span id="dsc-widget-online-members-text" />
                    </div>
                    
                    <div id="dsc-widget-total-members" class="dsc-widget-member-count">
                        <span class="dsc-widget-circle dsc-widget-circle-members">&nbsp;</span>
                        <span id="dsc-widget-total-members-text" />
                    </div>
                    </div>
                </span>
                </div>
            </div>
            <div id="dsc-widget-join-link-container">
                <a id="dsc-widget-join-link" href="https://discord.gg" target="_blank">
                    <button id="dsc-widget-join-btn">
                        Join
                    </button>
                </a>
            </div>
        
        </div>
    </div> 
    `

    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style')
        style.id = 'discord-widget-styling'
        style.innerHTML = css
        document.head.appendChild(style)
    })
    /**
     * 
     * @param {number | string} str 
     * @returns {string} str, with commas inserted
     * @author https://stackoverflow.com/a/2901298
     */
    const insertCommas = (str) => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    class DiscordWidget {
        /**
         * 
         * @param {string} _invite 
         * @param {HTMLElement} element 
         * @param {string?} fallbackImg fallback image URL alt
         */
        constructor(_invite, element, fallbackImg = '') {
            this.container = element
            this.invite = _invite
            this.altImg = fallbackImg
        }

        async create() {
            this.container.innerHTML = html

            
            const inviteContainer = document.querySelector('#dsc-widget-invite-container')
                    
            /** @type {HTMLImageElement | null} */
            const iconElement = document.querySelector('#dsc-widget-server-icon')
            const nameElement = document.querySelector('#dsc-widget-server-name')
            const inviteElement = document.querySelector('#dsc-widget-join-link')
            
            const onlineMembersText = document.querySelector('#dsc-widget-online-members-text')
            const totalMembersText = document.querySelector('#dsc-widget-total-members-text')
            
            const data = await fetch(`https://discord.com/api/v9/invites/${this.invite}?with_counts=true&with_expiration=true`).then(res => res.json())
            
            const iconURL = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png`
            
            iconElement.style.backgroundImage = `url('${iconURL}')`
            iconElement.alt = this.altImg || ''
            
            const memberCount = data.approximate_member_count;
            totalMembersText.innerHTML = `${insertCommas(memberCount)} Members`
            const onlineCount = data.approximate_presence_count;
            onlineMembersText.innerHTML = `${insertCommas(onlineCount)} Online`
            const invite = data.code
            inviteElement.href = `https://discord.gg/${invite}`
            
            const guildName = data.guild.name
            nameElement.innerHTML = guildName
            
            const splashURL = `https://cdn.discordapp.com/splashes/${data.guild.id}/${data.guild.splash}.jpg?size=480`
            inviteContainer.style.backgroundImage = `url('${splashURL}')`
            

        }

        delete() {
            this.container.innerHTML = ''
        }
    }

    window.DiscordWidget = DiscordWidget
})()