let api = "http://localhost:9009"
async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response  =  await fetch(api+"/planets")
  let data = await response.json()
console.log(data)
   return data
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready
  const response  =  await fetch(api+"/launch")
   let data = await response.json()

   return data.sort((a,b)=> a.flightNumber - b.flightNumber)
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
try{
 return  await fetch(api+"/launch",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(launch)
  })
}catch(err){
  return {
    ok:false
  }
}

}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try{
  return await fetch(api+"/launch/"+id,{
    method:"delete"
  })
}catch(err){
  return{
    ok:false
  }
}
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};