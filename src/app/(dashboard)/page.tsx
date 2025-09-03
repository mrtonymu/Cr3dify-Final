// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import Award from '@views/dashboard/Award'
import CardStatVertical from '@components/card-statistics/Vertical'
import Table from '@views/dashboard/Table'

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <Award />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='Total Clients'
              stats='1,247'
              avatarIcon='ri-user-line'
              avatarColor='primary'
              subtitle='Active Clients'
              trendNumber='12%'
              trend='positive'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              stats='$45.2k'
              trend='positive'
              trendNumber='8%'
              title='Monthly Revenue'
              subtitle='This Month'
              avatarColor='success'
              avatarIcon='ri-money-dollar-circle-line'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
