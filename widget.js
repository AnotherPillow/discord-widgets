(function () {
    const css = `
        @import url("https://fonts.googleapis.com/css?family=Lato:400,400i,700");
        .circle {
            width: 0.7em;
            height: 0.7em;
            margin: 0.3em;
            border-radius: 50%;
        }
        .circle.circle-online {
            background-color: #23A559;
        }
        .circle.circle-members {
            background-color: #80848E;
        }
        
        #invite-container {
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
        }
        
        #child1, #child2 {
            width: 100%;
            height: 100%;
        }
        
        #child1 {
            grid-row: 1/2;
        }
        
        #child2 {
            grid-row: 2/3;
            background-color: #1a1a1a;
            display: flex;
            flex-flow: row wrap;
            gap: 16px;
        }
        #child2 #server-info {
            display: flex;
            flex: 1000 0 auto;
            align-items: center;
            max-width: 100%;
            gap: 16px;
            margin-left: 1em;
        }
        #child2 #server-info #server-icon {
            flex: 0 0 auto;
            width: 5em;
            height: 5em;
            border-radius: 15px;
            position: relative;
            background-clip: padding-box;
            background-position: center center;
            background-size: 100% 100%;
        }
        #child2 #server-info #server-details {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: stretch;
            min-width: 1px;
            color: white;
        }
        #child2 #server-info #server-details h3 {
            margin-top: 0;
        }
        #child2 #server-info #server-members #member-counts-outer-parent {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            column-gap: 12px;
        }
        #child2 #server-info #server-members #member-counts-outer-parent .member-count {
            display: flex;
            flex: 0 1 auto;
            align-items: center;
            flex-flow: nowrap;
            min-width: 0;
        }
        #child2 #server-info #server-members #member-counts-outer-parent .member-count span {
            flex: 0 1 auto;
        }
        #child2 #join-link-container {
            flex: 1 0 auto;
            align-self: center;
            height: inherit;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 1em;
        }
        #child2 #join-link {
            text-decoration: none;
        }
        #child2 #join-btn {
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
        #child2 #join-btn:hover {
            filter: brightness(0.8);
        }
    `
    const html = `
    <div id="invite-container">
    <div id="child1"> 
    
    </div>
    <div id="child2"> 
      <div id="server-info"> 
        <div id="server-icon"></div>
        <div id="server-details"> 
          <h3 id="server-name">Loading...</h3>
          <strong id="server-members">
            <div id="member-counts-outer-parent">
              <div id="online-members" class="member-count">
                <span class="circle circle-online">&nbsp;</span>
                <span id="online-members-text" />
              </div>
              
              <div id="total-members" class="member-count">
                <span class="circle circle-members">&nbsp;</span>
                <span id="total-members-text" />
              </div>
            </div>
          </strong>
        </div>
      </div>
      <div id="join-link-container">
        <a id="join-link" href="https://discord.gg" target="_blank">
          <button id="join-btn">
            Join
          </button>
        </a>
      </div>
      
    </div>
  </div>
    `

    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style')
        style.innerHTML = css
        document.head.appendChild(style)
    })

    class DiscordWidget {
        /**
         * 
         * @param {string} _invite 
         * @param {HTMLElement} element 
         */
        constructor(_invite, element) {
            this.container = element
            this.invite = _invite
        }

        async create() {
            this.container.innerHTML = html

            
            const inviteContainer = document.querySelector('#invite-container')
                    
            const iconElement = document.querySelector('#server-icon')
            const nameElement = document.querySelector('#server-name')
            const inviteElement = document.querySelector('#join-link')
            
            const onlineMembersText = document.querySelector('#online-members-text')
            const totalMembersText = document.querySelector('#total-members-text')
            
            const data = await fetch(`https://discord.com/api/v9/invites/${this.invite}?with_counts=true&with_expiration=true`).then(res => res.json())
            
            const iconURL = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png`
            
            iconElement.style.backgroundImage = `url('${iconURL}')`
            
            const memberCount = data.approximate_member_count;
            totalMembersText.innerHTML = `${memberCount} Members`
            const onlineCount = data.approximate_presence_count;
            onlineMembersText.innerHTML = `${onlineCount} Online`
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