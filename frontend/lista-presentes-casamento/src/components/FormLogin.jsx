import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export default function FormLogin() {
  return (
    <Flex className="font-playFair">
      <Box
        p={12}
        minWidth="400px"
        backgroundColor="whitesmoke"
        borderRadius={8}
        boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel>Nome de Usuário</FormLabel>
              <Input type="text" placeholder="joaosilva" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="*******" />
            </FormControl>
            <Button backgroundColor="pink" width="full" mt={4} type="submit">
              Conectar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
