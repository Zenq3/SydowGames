import { Config } from './config.js';

const playerListElement = document.getElementById('playerList');
const actionLogElement = document.getElementById('actionLog');

function createPlayerItem(player) {
    const item = document.createElement('li');
    item.className = 'player-card';
    item.dataset.playerId = player.id;

    const avatar = document.createElement('span');
    avatar.className = 'player-avatar';
    avatar.textContent = player.callsign[0];

    const info = document.createElement('div');
    info.className = 'player-info';
    info.innerHTML = `
        <span class="player-callsign">${player.callsign} | ${player.name}</span>
        <span class="player-distance">${player.distance} m</span>
    `;

    item.appendChild(avatar);
    item.appendChild(info);

    item.addEventListener('click', () => {
        document.querySelectorAll('.player-card').forEach((card) => {
            card.classList.toggle('active', card === item);
        });
    });

    return item;
}

function populatePlayerList() {
    const filteredPlayers = Config.players.filter((player) => player.distance <= Config.radiusMeters);
    playerListElement.innerHTML = '';
    filteredPlayers.forEach((player, index) => {
        const playerItem = createPlayerItem(player);
        if (index === 0) {
            playerItem.classList.add('active');
        }
        playerListElement.appendChild(playerItem);
    });
}

function renderCommandTags() {
    const commandTags = document.querySelectorAll('.command-tag');
    commandTags.forEach((tag) => {
        const type = tag.dataset.command;
        if (type === 'enter') {
            tag.textContent = `${Config.commands.enterImmigration} – Teleport zur ${Config.teleportLocations.commandEnter.label}`;
        } else {
            tag.textContent = `${Config.commands.leaveImmigration} – Rückkehr zu ${Config.teleportLocations.commandExit.label}`;
        }
    });
}

function renderTeleportInfo() {
    const teleportElements = document.querySelectorAll('.teleport-info');
    teleportElements.forEach((element) => {
        const location = Config.teleportLocations[element.dataset.location];
        if (!location) return;
        const { label, coordinates } = location;
        element.textContent = `${label}: ${coordinates.x}, ${coordinates.y}, ${coordinates.z}`;
    });
}

function appendLogEntry(message) {
    const listItem = document.createElement('li');
    const time = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    listItem.innerHTML = `<time>[${time}]</time> ${message}`;
    actionLogElement.prepend(listItem);
}

function getActivePlayer() {
    const activeCard = document.querySelector('.player-card.active');
    if (!activeCard) return null;
    const playerId = Number(activeCard.dataset.playerId);
    return Config.players.find((player) => player.id === playerId) || null;
}

function handleAction(action) {
    const player = getActivePlayer();
    if (!player) {
        appendLogEntry('Kein Spieler ausgewählt.');
        return;
    }

    switch (action) {
        case 'einreisen':
            appendLogEntry(`${player.callsign} ${player.name} wird zur ${Config.teleportLocations.entry.label} teleportiert (${formatCoords(Config.teleportLocations.entry.coordinates)}).`);
            break;
        case 'secondChance':
            appendLogEntry(`${player.callsign} ${player.name} erhält einen Bann über ${Config.bans.secondChanceHours} Stunden.`);
            break;
        case 'ausreisen':
            appendLogEntry(`${player.callsign} ${player.name} erhält einen Bann über ${Config.bans.exitDays} Tage.`);
            break;
        case 'perma':
            appendLogEntry(`${player.callsign} ${player.name} erhält einen permanenten Bann: ${Config.bans.permanentReason}.`);
            break;
        default:
            appendLogEntry('Unbekannte Aktion.');
    }
}

function formatCoords({ x, y, z }) {
    return `${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}`;
}

function registerActions() {
    document.querySelectorAll('.action-button').forEach((button) => {
        button.addEventListener('click', () => handleAction(button.dataset.action));
    });
}

populatePlayerList();
renderCommandTags();
renderTeleportInfo();
registerActions();
