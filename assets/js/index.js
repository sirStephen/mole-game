let score = 0;

const getSadInterval = () => {
    return Date.now() + 500;
}

const getGoneInterval = () => {
    return Date.now() + Math.floor(Math.random() * 9000) + 1000;
}

const getHungryInterval = () => {
    return Date.now() + Math.floor(Math.random() * 1500) + 1000;
}

const getKingStatus = () => {
    return Math.random() > 0.9;
}

const moles = [
    {
        status: 'sad',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-0')
    },
    {
        status: 'leaving',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-1')
    },
    {
        status: 'gone',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-2')
    },
    {
        status: 'hungry',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-3')
    },
    {
        status: 'sad',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-4')
    },
    {
        status: 'leaving',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-5')
    },
    {
        status: 'gone',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-6')
    },
    {
        status: 'hungry',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-7')
    },
    {
        status: 'sad',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-8')
    },
    {
        status: 'leaving',
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-9')
    }
];

const getNextStatus = (mole) => {
    switch(mole.status) {
        case 'sad':
        case 'fed':
            mole.next = getSadInterval();
            mole.status = 'leaving';
            if (mole.king) {
                mole.node.children[0].src = './assets/img/king-mole-leaving.png'
            } else {
                mole.node.children[0].src = './assets/img/mole-leaving.png'
            }
            break;
        
        case 'leaving':
            mole.next = getGoneInterval();
            mole.status = 'gone';
            mole.node.children[0].classList.add('gone');
            break;

        case 'gone':
            mole.status = 'hungry';
            mole.king = getKingStatus();
            mole.next = getHungryInterval();
            mole.node.children[0].classList.add('hungry');
            mole.node.children[0].classList.remove('gone');
            if (mole.king) {
                mole.node.children[0].src = './assets/img/king-mole-hungry.png'
            } else {
                mole.node.children[0].src = './assets/img/mole-hungry.png'
            }
            break;

        case 'hungry':
            mole.status = 'sad';
            mole.next = getSadInterval();
            mole.node.children[0].classList.remove('hungry');
            if (mole.king) {
                mole.node.children[0].src = './assets/img/king-mole-sad.png'
            } else {
                mole.node.children[0].src = './assets/img/mole-sad.png'
            }
            break;
    }
}

const feed = (event) => {
    if (event.target.tagName !== 'IMG' || !event.target.classList.contains('hungry')) {
        return;
    }

    const mole = moles[parseInt(event.target.dataset.index)]
    console.log(mole)
    
    mole.status = 'fed';
    mole.next = getSadInterval();
    if (mole.king) {
        score += 2;
        mole.node.children[0].src = './assets/img/king-mole-fed.png'
    } else {
        score++;
        mole.node.children[0].src = './assets/img/mole-fed.png'
    }
    mole.node.children[0].classList.remove('hungry');

    if (score >= 10) {
        win();
    }

    document.querySelector('.worm-container').style.width = `${10 * score}%`;
}

const win = () => {
    document.querySelector('.bg').classList.add('hide');
    document.querySelector('.win').classList.remove('hide');
}

let runAgainAt = Date.now() + 100;
const nextFrame = () => {
    const now = Date.now();

    if (runAgainAt <= now) {
        console.log('now');
        for (let i = 0; i < moles.length; i++) {
            const element = moles[i];
            if (element.next <= now) {
                getNextStatus(element);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}

document.querySelector('.bg').addEventListener('click', feed);

nextFrame();