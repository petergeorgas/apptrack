# apptrack

[apptrack](http://apptrack-phi.vercel.app/) is a full-stack application that makes it really easy to keep track of all of your job applications. The frontend (this repository) is written with TypeScript and leaverages Next.js/React. [The backend](https://github.com/petergeorgas/AppTrack_Server) uses GraphQL, with resolvers implemented in Go and is deployed to Google Cloud Platform utilizing Cloud Run.


### Dark and Light mode

![apptrack-dark](https://user-images.githubusercontent.com/21143531/174932480-0e3ae7b2-209d-4b11-b73e-87f2acd0589a.png)
![apptrack-light](https://user-images.githubusercontent.com/21143531/174933039-9a1a576e-d2ce-44e4-be12-6fa68f4db84f.png)

### Mobile-Friendly
![image](https://user-images.githubusercontent.com/21143531/174933610-4e087f0a-4872-4d46-b4fe-5d9e6a06e4ff.png)


#### Adding/Updating Applications

![Add/Update application](https://user-images.githubusercontent.com/21143531/174933711-1536dfce-e174-4a66-9658-bf8a7e394ea0.png)

### Logging In
Currently, the only way to use apptrack is by logging in. We use Google Firebase Authentication to handle that, and try to make it as easy as possible. Soon, hopefully apptrack will be able to persist your job application data locally and only require a signin if the user would like to sync their application info across the web. 

![Login Screen](https://user-images.githubusercontent.com/21143531/174934295-db7d8d55-dbba-4a4c-8985-a330e4daea21.png)




