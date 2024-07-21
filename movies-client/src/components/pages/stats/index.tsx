import { BarChart } from  '@mui/x-charts/BarChart';
export default function ChartsOverviewDemo() {
  return (
    <BarChart
      series={[
        { data: Object.values(result) },
    
      ]}
      height={290}
      xAxis={[{ data: Object.keys(result), scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}




const data=[{movieName: "scream" , numberOfLikes: 50}, {movieName: "scream2" , numberOfLikes: 30},{movieName: "scream3" , numberOfLikes: 30} ]

const result= data.reduce((obj, current) => {

if (obj[current.movieName]) {
  return obj
}else{
  obj[current.movieName] = current.numberOfLikes
  return obj
}



},{})


