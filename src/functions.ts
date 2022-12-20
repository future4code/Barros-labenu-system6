export const dateFormat = (dateAccount:string):string=>{
  let parts = dateAccount.split('/')
     dateAccount = `${parts[2]}-${parts[1]}-${parts[0]}`
  return dateAccount 
}