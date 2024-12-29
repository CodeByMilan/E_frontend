import React from 'react';

const message = [
  {
    name: 'John Doe',
    image: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(3).jpg',
    text: 'The quality of the shoes I purchased is amazing! They fit perfectly and are incredibly comfortable. Highly recommend them for anyone looking for stylish and durable footwear!',
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    image: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(4).jpg',
    text: 'I’m absolutely in love with my new jacket! It’s just the right size, warm, and the material feels premium. I’ll definitely shop here again!',
    rating: 5,
  },
  {
    name: 'Michael Smith',
    image: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(5).jpg',
    text: 'Great place for buying tech gadgets. I bought a smartwatch, and it works flawlessly. The delivery was prompt, and the customer service was excellent!',
    rating: 4,
  },
  {
    name: 'Sarah Lee',
    image: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(6).jpg',
    text: 'Had an amazing experience shopping for home décor here! The sofa I ordered was exactly as described, and it was delivered on time. Will definitely be back for more!',
    rating: 5,
  },
  {
    name: 'Chris Brown',
    image: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(7).jpg',
    text: 'The sneakers I purchased are incredible! Comfortable, stylish, and exactly what I was looking for. Will definitely order again!',
    rating: 5,
  },
  {
    name: 'Katie Wilson',
    image: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(8).jpg',
    text: 'I love the variety of clothing on this site. The dresses I ordered were perfect, and the fabric is high quality. I can’t wait to buy more!',
    rating: 4,
  },
  {
    name: 'David Miller',
    image: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg',
    text: 'This online store never disappoints! I ordered a set of kitchen appliances, and everything arrived in perfect condition. The quality is top-notch!',
    rating: 5,
  },
  {
    name: 'Olivia Taylor',
    image: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(10).jpg',
    text: 'An outstanding shopping experience! The customer service team went above and beyond to ensure my order was correct. Plus, the quality of the products is fantastic!',
    rating: 5,
  },
];

  

const Review = () => {
  return (
    <>
    <section className="w-screen  text-center p-5 mt-5 mb-10">
      <h3 className="mb-15 text-3xl font-bold ">What People Says About Us !!</h3>
      <div className="grid gap-6 text-center md:grid-cols-4 lg:gap-12">
        {message.map((message, index) => (
          <div key={index} className="mb-12 mt-10 md:mb-0">
            <div className="mb-6 flex justify-center">
              <img
                src={message.image}
                alt={`${message.name}'s profile`}
                className="w-32 rounded-full shadow-lg dark:shadow-black/30"
              />
            </div>
            <h5 className="mb-4 text-xl font-semibold">{message.name}</h5>
            <p className="mb-4 text-neutral-600 dark:text-neutral-300">
              {message.text}
            </p>
            <ul className="mb-0 flex items-center justify-center">
              {Array.from({ length: message.rating }).map((_, i) => (
                <li key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              ))}
              {Array.from({ length: 5 - message.rating }).map((_, i) => (
                <li key={i} className="opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
    
    </>
  );
};

export default Review;
