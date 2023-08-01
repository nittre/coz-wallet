import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box, Button, FormControl, Input } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { createWallet } from 'utils/crypto';
import { useState } from 'react';
import { pasteToClipboard } from 'utils/utils';


// assets

// ===============================|| Create Wallet ||=============================== //

const createWalletStep = ['start', 'pasteMnemonic', 'end']

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [step, setStep] = useState(createWalletStep[0])
  const [phrase, setPhrase] = useState([])
  const [isPhrasePasted, setIsPhrasePasted] = useState(false)

  const handleCreateButtonClick = () => {
	try {
		if (step == createWalletStep[0]){
			const wallet = createWallet()
			setPhrase(wallet.mnemonic.phrase.split(' '))
			setStep(createWalletStep[1])
		} else if (step == createWalletStep[1]) {
			navigate('/')
		}
	} catch(e) {
		console.error(e)
	}
  }

  const handlePasteButtonClick = (e) => {
	if (pasteToClipboard(phrase.join(' '))) {
		setIsPhrasePasted(true)
	}
	else {
		console.error('something wrong')
	}
  }

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            지갑 생성하기
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
							{
								step === 'start' ? (
								<>버튼을 누르면 새로운 지갑을 생성합니다.</>
								) : step === 'pasteMnemonic' ? (
								<>니모닉을 복사하세요.</>
								) : null
							}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
				</Grid>
				{
					step === 'pasteMnemonic' ? (
						<>
							{
								Array.from({length: 12}, (_, index) => {
									return <FormControl key={phrase[index]} sx={{...theme.typography.customInput}}>
										<Input
											id={phrase[index]}
											type="text"
											value={phrase[index]}
											name={phrase[index]}
										/>
									</FormControl>
								})
							}
						</>
					) : null
				}
				{
					step === 'pasteMnemonic' ? (
					<>
						<Box sx={{ mt: 2 }}>
						<AnimateButton>
							<Button onClick={handlePasteButtonClick} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
								{
									isPhrasePasted === false 
									? (
										<>복사하기</>
									) : (
										<>복사 완료!</>
									)
								}
							</Button>
						</AnimateButton>
						</Box>
					</>
					) : null
				}

				<Box sx={{ mt: 2 }}>
					<AnimateButton>
					{
						step === 'start' ? (
							<Button onClick={handleCreateButtonClick} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
								생성하기
							</Button>
						) : ( 
							<Button disabled={!isPhrasePasted} onClick={handleCreateButtonClick} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
								확인
							</Button>
						)
					}
					</AnimateButton>
				</Box>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
