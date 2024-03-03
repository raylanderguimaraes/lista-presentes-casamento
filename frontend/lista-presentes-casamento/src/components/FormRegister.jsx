import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export default function FormRegister() {
  return (
    <Flex className="font-playFair">
      <Box
        p={12}
        minWidth="400px"
        backgroundColor="whitesmoke"
        borderRadius={8}
        boxShadow="lg">
        <Box textAlign="center">
          <Heading>Cadastrar</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input type="text" placeholder="João" />
            </FormControl>
            <FormControl>
              <FormLabel>Sobrenome</FormLabel>
              <Input type="text" placeholder="Silva" />
            </FormControl>
            <FormControl>
              <FormLabel>Nome de usuaário</FormLabel>
              <Input type="text" placeholder="joaosilva" />
            </FormControl>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="*******" />
            </FormControl>
            <Button backgroundColor="pink" width="full" mt={4} type="submit">
              Cadastrar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
