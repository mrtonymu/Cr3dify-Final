'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const UnderMaintenance = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-6'>
      <Card className='max-w-md w-full'>
        <CardContent className='text-center p-6'>
          <Typography variant='h4' className='mb-4'>
            🚧 Under Maintenance
          </Typography>
          <Typography variant='body1' className='mb-6 text-gray-600'>
            We&apos;re currently performing scheduled maintenance. Please check back later.
          </Typography>
          <Button 
            variant='contained' 
            color='primary'
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default UnderMaintenance