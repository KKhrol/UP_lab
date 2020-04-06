class TwitterPosts {
    constructor(posts) {
        this.posts = posts.concat();

    }

    static validateSchema(post, arg) {
            switch (arg) {
                case "id":
                    return typeof post.id === "string";
                case "description":
                    return typeof post.description === "string" && post.description.length < 200;
                case "createdAt":
                    return Object.prototype.toString.call(post.createdAt) === '[object Date]';
                case "author":
                    return typeof post.author === "string" && post.author.length !== 0;
                case "photoLink":
                    return typeof post.photoLink === "string";
                case "hashTags":
                    return post.hashTags && post.hashTags.every(tag => typeof tag === "string");
                case "likes":
                    return post.hashTags && post.likes.every(tag => typeof tag === "string");

                default:
                    return false;
            }
    }

    static validatePost(post) {

            let validArguments = TwitterPosts.validateSchema;

            return validArguments(post, "id") && validArguments(post, "description") &&
                validArguments(post, "createdAt") && validArguments(post, "author") &&
                validArguments(post, "hashTags") && validArguments(post, "likes");
    }

    getPosts(skip, top, filterConfig) {
        let result = this.posts.concat();

            if (filterConfig) {
                for (let arg in filterConfig) {
                    if (arg === "hashTags") {
                        for (let i = 0; i < filterConfig.hashTags.length; i++) {
                            result = result.filter(post => post.hashTags.includes(filterConfig.hashTags[i]))
                        }
                    } else if (arg === "author" || arg === "likes"){
                        for (let i = 0; i < filterConfig[arg].length; i++) {
                            result = result.filter(post => post[arg].includes(filterConfig[arg][i]));
                        }
                    }
                }
            }
            result.sort(function (post1, post2) {return post2.createdAt - post1.createdAt;});
            return result.slice(skip, skip + top);
    }


        getPost(id) {
            return this.posts.find(post => post.id === id);
        }


        addPost(post) {
            if (TwitterPosts.validatePost(post)) {
                this.posts.push(post);
                return true;
            }
            return false;
        }


        removePost(id) {
            let postID = this.posts.findIndex(post => post.id === id);

            if (postID === -1) {
                return "Not removed";
            }

            this.posts.slice(postID, 1);
            return "Removed";
        }

        clear() {
        this.posts = [];
        }


        editPost(id, post) {
            if (!TwitterPosts.validateEditPost(post)) {
                return false;
            }
            let curPost = this.getPost(id);

            for (let arg in post) {
                curPost[arg] = post[arg];
            }
            return true;
        }


    static validateEditPost(post) {
        for(let arg in post) {

            if (arg === "id" || arg === "author" || arg === "likes" || arg == "createdAt") {
                return false;
            }
            else if (!TwitterPosts.validateSchema(post, arg)) {
                return false;
            }
        }
        return true;
    }



};



var postsTemp = new TwitterPosts([
    {
        id: "1",
        description: "Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного " +
            "новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.",
        createdAt: new Date("2020-03-17T23:00:00"),
        author: "Иванов Иван",
        photoLink: "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
        hashTags: ["COVID19", "coronavirus"],
        likes: ["Сергеев Сергей", "Алексеев Алексей", "Романов Роман"],
    },
    {
        id: "2",
        description: "Английскими учеными было установлено, что уксусный альдегид," +
            " который является побочным продуктом расщепления в организме этилового спирта, может " +
            "вызвать необратимые повреждения ДНК",
        createdAt: new Date("2020-03-17T23:01:10"),
        author: "Сергеев Сергей",
        photoLink: "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
        hashTags: ["DNA", "Fact", "Science"],
        likes: ["Анатова Анна", "Алексеев Алексей", "Романов Роман", "Узумаки Наруто", "Сакович Альжбета"],
    },
    {
        id: '3',
        description: 'Английскими учеными было установлено, что уксусный альдегид,' +
            ' который является побочным продуктом расщепления в организме этилового спирта, может ' +
            'вызвать необратимые повреждения ДНК',
        createdAt: new Date('2020-03-18T09:33:14'),
        author: 'Харуно Сакура',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['DNA', 'Fact', 'Science'],
        likes: ['Браун Ян', 'Иванов Иван', 'Романов Роман', 'Узумаки Наруто', 'Учиха Мадара', 'Сенджу Цунаде',
            'Транс Бамблби', 'Поттер Гарри', 'Альма Герадот', 'Майто Гай', 'Рок Ли', 'Рейн Роман'],
    },
    {
        id: '4',
        description: 'Кирон Уильямсон в свои 10 лет прославился тем, что рисует картины в стиле «Моне». ' +
            'Его работы Интернет покупателями всего за 20 минут были раскуплены на сумму $2,2 млн',
        createdAt: new Date('2020-03-18T12:45:45'),
        author: 'Усович Ус',
        hashTags: ['Mone', 'Genius', 'Art', 'Fact'],
        likes: ['Баба Яга', 'Сергеев Сергей', 'Узумаки Боруто', 'Учиха Мадара', 'Никотин Никодим',
            'Транс Бамблби', 'Альма Герадот', 'Майто Гай', 'Рок Ли'],
    },
    {
        id: '5',
        description: 'Известный психолог Соломон Эш в 1951 году провел интересный эксперимент, в котором выяснилось, ' +
            'насколько человек свободен в своем выборе на самом деле, несмотря на мнение большинства',
        createdAt: new Date('2020-03-18T17:00:09'),
        author: 'Аспер Икс',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Psychology', 'Experiment', 'Choice', 'Fact'],
        likes: ['Дональд Дак', 'Уайт Кенни', 'Пранприя Манобан', 'Ли МинКи', 'Никотин Никодим',
            'Транс Бамблби', 'Дружко Сергей', 'Майто Гай', 'Рок Ли', 'Лютер Мартин'],
    },
    {
        id: '6',
        description: 'Ох уж этот храп… сколько жен каждую ночь страдает от него. Но давайте будем откровенны, ' +
            'не только жены, но и мужья тоже частенько становятся жертвами женского храпа',
        createdAt: new Date('2020-03-18T17:00:09'),
        author: 'Белов Афанасий',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Snore', 'SOS', 'Life', 'Marriage'],
        likes: ['Дональд Дак', 'Уайт Кенни', 'Пранприя Манобан', 'Ли МинКи', 'Никотин Никодим',
            'Дружко Сергей', 'Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Алексеев Алексей', 'Анатова Анна'],
    },
    {
        id: '7',
        description: 'Стивен Уилтшир прославился в мире своей уникальной, невероятной памятью. Благодаря ' +
            'своим способностям он нарисовал огромную пятиметровую панораму города Нью-Йорк',
        createdAt: new Date('2020-03-18T18:01:19'),
        author: 'Голд Фишь',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Genius', 'Memory'],
        likes: ['Дональд Трамп', 'Уайт Кенни', 'Пранприя Манобан', 'Конпимук Бхувакул', 'Никотин Никодим',
            'Транс Бамблби', 'Конасова Екатерина', 'Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Алексеев Алексей', 'Анатова Анна'],
    },
    {
        id: '8',
        description: 'Да прибудет с вами сила ЙУОННОСТИ!!!',
        createdAt: new Date('2020-03-18T18:23:56'),
        author: 'Рок Ли',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['YOUTH'],
        likes: ['Майто Гай', 'Узумаки Наруто'],
    },
    {
        id: '9',
        description: 'Ресторан Каябуки прославился сразу после открытия. Но не благодаря своему необыкновенно вкусному ' +
            'или оригинальному меню, а благодаря обезьяне, которая работает официантом',
        createdAt: new Date('2020-03-18T18:18:23'),
        author: 'Доктор Мяу',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Animals', 'Japan', 'Fact'],
        likes: ['Дональд Трамп', 'Уайт Кенни', 'Пранприя Манобан', 'Конпимук Бхувакул', 'Никотин Никодим',
            'Транс Бамблби', 'Конасова Екатерина', 'Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Алексеев Алексей',
            'Анатова Анна', 'Романов Роман', 'Сакович Альжбета', 'Сакура Харуно', 'Учиха Мадара', 'Намикадзе Минато'],
    },
    {
        id: '10',
        description: 'В Тунисе принято при встрече сначала поклонится, ко лбу поднести правую руку, после чего к ' +
            'губам, к сердцу. Все это значит, что человека, которого вы приветствуете, вы уважаете, говорите о нем и думаете о нем',
        createdAt: new Date('2020-03-18T21:56:00'),
        author: 'Сакович Альжбета',
        hashTags: ['Greeting', 'Meeting', 'Fact'],
        likes: ['Конпимук Бхувакул', 'Харуно Сакура', 'Транс Бамблби', 'Конасова Екатерина', 'Майто Гай',
            'Рок Ли', 'Лютер Мартин', 'Алексеев Алексей', 'Анатова Анна', 'Романов Роман'],
    },
    {
        id: '11',
        description: 'Когда вы о чем-то мечтаете, единственным пределом в исполнении этой мечты являетесь вы и только' +
            ' вы. Никакие обстоятельства или время не предел для того, кто на самом деле чего-то желает',
        createdAt: new Date('2020-03-18T23:23:23'),
        author: 'Инста Гёрл',
        hashTags: ['Dreams', 'Motivation'],
        likes: ['Дональд Дак', 'Пранприя Манобан', 'Конпимук Бхувакул', 'Никотин Никодим', 'Транс Бамблби',
            'Конасова Екатерина', 'Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Алексеев Алексей',
            'Анатова Анна', 'Романов Роман'],
    },
    {
        id: '12',
        description: 'Исследователи из Вермонтского университета выступили с невероятным и сенсационным заявлением –' +
            ' в природе существует не 4 группы крови, а 6! Открытые две группы получили название Лангерайс и Джуниор',
        createdAt: new Date('2020-03-18T23:56:31'),
        author: 'Сергеев Сергей',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Dreams', 'Motivation'],
        likes: ['Конасова Екатерина', 'Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Романов Роман'],
    },
    {
        id: '13',
        description: 'Исследователи из Вермонтского университета выступили с невероятным и сенсационным заявлением –' +
            ' в природе существует не 4 группы крови, а 6! Открытые две группы получили название Лангерайс и Джуниор',
        createdAt: new Date('2020-03-18T23:56:31'),
        author: 'Сергеев Сергей',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Discovery', 'GroupOfBlood', 'Fact'],
        likes: ['Конасова Екатерина', 'Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Романов Роман'],
    },
    {
        id: '14',
        description: 'Австралия. В 2002 году ученый из Сиднея, выдал книгу, в которой абсолютно всерьез обсуждаются ' +
            'все причины появления в пупке человека мусора и рассматривается его полный состав',
        createdAt: new Date('2020-03-19T00:00:11'),
        author: 'Романов Роман',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Australia', 'Navel'],
        likes: ['Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Дональд Дак', 'Уайт Кенни', 'Пранприя Манобан',
            'Конпимук Бхувакул', 'Никотин Никодим', 'Транс Бамблби', 'Сакович Альжбета', 'Сакура Харуно',
            'Учиха Мадара', 'Намикадзе Минато'],
    },
    {
        id: '15',
        description: 'Компания Blk создала первую в мире черную минеральную воду. Она некалорийная, негазированная и ' +
            'с недавних пор ее уже можно приобрести по 2,3 долл. за бутылку',
        createdAt: new Date('2020-03-19T03:12:59'),
        author: 'Пранприя Манобан',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Blk', 'BlackWater'],
        likes: ['Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Дональд Дак', 'Уайт Кенни', 'Колтун Николь',
            'Конпимук Бхувакул', 'Никотин Никодим', 'Транс Бамблби', 'Сакович Альжбета', 'Сакура Харуно',
            'Учиха Мадара', 'Джесси Ким'],
    },
    {
        id: '16',
        description: 'Самый любимый цвет человечества - небольшой интересный факт к которому пришли социологи ' +
            'Университета штата Мэриленд (США), опросив 1974 человека.',
        createdAt: new Date('2020-03-19T07:22:45'),
        author: 'Уолтер Дан',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Colors', 'Fact'],
        likes: ['Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Дональд Дак'],
    },
    {
        id: '17',
        description: 'В этой статье приведем небольшую, с одной стороны шутливую, но с другой стороны полностью ' +
            'научную теорию с помощью которой можно оправдать себя в те моменты, когда над Вами взяла верх лень.',
        createdAt: new Date('2020-03-19T10:42:47'),
        author: 'Уолтер Дан',
        hashTags: ['Laziness', 'Scince', 'Fun'],
        likes: ['Майто Гай', 'Рок Ли', 'Лютер Мартин', 'Дональд Дак', 'Дональд Трамп', 'Пранприя Манобан',
            'Конпимук Бхувакул', 'Никотин Никодим', 'Транс Бамблби', 'Конасова Екатерина', 'Колтун Николь'],
    },
    {
        id: '18',
        description: '10 продуктов, способных предотвратить рак груди',
        createdAt: new Date('2020-03-19T10:52:06'),
        author: 'Малышева Елена',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Products', 'Fact'],
        likes: ['Майто Гай', 'Рок Ли'],
    },
    {
        id: '19',
        description: 'Существует миф, что один лист бумаги нельзя сложить более семи раз так, чтобы линия каждого ' +
            'последующего изгиба была перпендикулярна линии предыдущего изгиба. Однако это не правда.',
        createdAt: new Date('2020-03-19T10:52:06'),
        author: 'Колтун Николь',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['Paper', 'Myth'],
        likes: ['Майто Гай', 'Рок Ли', 'Транс Бамблби', 'Сакович Альжбета', 'Сакура Харуно',
            'Учиха Мадара', 'Намикадзе Минато'],
    },
    {
        id: '20',
        description: 'Термин «Большой взрыв» был придуман известным британским физиком и астрономом Фредом Хойлом, ' +
            'который пытался с его помощью выразить свое саркастическое отношение к такой идее возникновения Вселенной.',
        createdAt: new Date('2020-03-20T14:49:36'),
        author: 'Хайнц Вольфрам',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['BigExplosion', 'Fact', 'Science'],
        likes: ['Майто Гай', 'Рок Ли', 'Уайт Кенни', 'Пранприя Манобан', 'Конпимук Бхувакул', 'Лютер Мартин',
            'Алексеев Алексей', 'Анатова Анна', 'Транс Бамблби', 'Сакович Альжбета', 'Сакура Харуно'],
    },
]);


console.log("_____________________________________________________");
console.log("The first post");
console.log(postsTemp.getPost("1"));


console.log("_____________________________________________________");
console.log("_____________________________________________________");
console.log("_____________________________________________________");
console.log("Last added 7 posts (2 first are skipped) with hashtag Fact");

postsTemp.getPosts(2, 7, {"hashTags": ["Fact"]}).forEach(function (post) {
    console.log(post);
});


console.log("_____________________________________________________");
console.log("_____________________________________________________");
console.log("_____________________________________________________");
console.log("Last added 2 posts of the author Сергеев Сергей");

postsTemp.getPosts(0, 2, {"author": ["Сергеев Сергей"]}).forEach(function (post) {
    console.log(post);
});




console.log("----------------------------------------------------");
console.log("Adding valid post");
console.log(TwitterPosts.validatePost({id: "21", createdAt: new Date(),
    description: "It seems that I have corona right now", author: "KKhrol", hashTags: ['COVID19'], likes: []}));


console.log("----------------------------------------------------");
console.log("Adding invalid post");
console.log(TwitterPosts.validatePost({id: "34"}));
console.log("----------------------------------------------------");

console.log("Add post and then get it");
postsTemp.addPost({id: "22", createdAt: new Date(),
    description: "See my new boyfriend", author: "Ivan", hashTags: ['boyfriend'], likes: []});
console.log(postsTemp.getPost("22"));



console.log("----------------------------------------------------");
console.log("Edit the 13 post from the array");
postsTemp.editPost("13", {photoLink: "no link"});
console.log(postsTemp.getPost("13"));



console.log("____________________________________________________");
console.log("Remove 12 post");
console.log(postsTemp.removePost("12"));




console.log("____________________________________________________");
console.log("Clear the page");
postsTemp.clear();
console.log("____________________________________________________");
